import { Injectable, Logger } from "@nestjs/common";
import { Job } from "../interfaces/job.interface";
import { UrlCheckerService } from "./url-checker.service";
import { UrlCheck } from "../interfaces/url-check.interface";

@Injectable()
export class JobsProcessor {
  private static readonly MAX_CONCURRENT_REQUESTS = 5;
  private readonly logger = new Logger(JobsProcessor.name);
  private readonly controllers = new Map<string, AbortController>();

  constructor(
    private readonly urlCheckerService: UrlCheckerService,
  ) { }

  async process(job: Job) {
    const controller = new AbortController();

    this.controllers.set(
      job.id,
      controller,
    );
    
    this.logger.log(
      `Start processing job ${job.id}`,
    );

    if (job.status === 'cancelled') {
      this.logger.log(
        `Job ${job.id} already cancelled`,
      );
      return;
    }

    job.status = 'in_progress';
    job.startedAt = new Date();

    let currentIndex = 0;

    const worker = async () => {
      while (true) {
        if (this.isCancelled(job)) {
          return;
        }
        const index = currentIndex++;
        if (index >= job.urls.length) {
          return;
        }

        this.logger.log(
          `Worker processing ${job.urls[index].url}`,
        );

        await this.processUrl(
          job,
          job.urls[index],
          controller.signal,
        );
      }
    };

    await Promise.all(
      Array.from(
        { length: JobsProcessor.MAX_CONCURRENT_REQUESTS },
        () => worker(),
      ),
    );

    if (!this.isCancelled(job)) {
      job.status = 'completed';
      this.logger.log(
        `Job ${job.id} completed`,
      );
    } else {
      this.logger.warn(
        `Job ${job.id} cancelled`,
      );
    }
    job.finishedAt = new Date();
  }

  private async processUrl(
    job: Job,
    urlCheck: UrlCheck,
    signal?: AbortSignal
  ): Promise<void> {

    if (this.isCancelled(job)) {
      return;
    }

    urlCheck.status = 'in_progress';
    urlCheck.startedAt = new Date();

    const startTime = Date.now();

    const result =
      await this.urlCheckerService.check(
        urlCheck.url,
        signal
      );

    await this.delay();

    const endTime = Date.now();

    urlCheck.finishedAt = new Date();
    urlCheck.duration = endTime - startTime;

    if (result.error) {
      urlCheck.status = 'error';
      urlCheck.error = result.error;
      urlCheck.httpStatus = result.httpStatus;

      this.logger.error(
        `${urlCheck.url} failed: ${result.error}`,
      );
    } else if (result.httpStatus) {
      urlCheck.status = 'success';
      urlCheck.httpStatus = result.httpStatus;

      this.logger.log(
        `${urlCheck.url} success: ${result.httpStatus}`,
      );
    }
  }

  cancel(jobId: string) {
    const controller =
      this.controllers.get(jobId);

    if (controller) {
      controller.abort();
    }

    this.controllers.delete(jobId);
  }

  private isCancelled(job: Job) {
    return job.status === 'cancelled';
  }

  private async delay(): Promise<void> {
    const timeout = Math.floor(
      Math.random() * 10000,
    );

    await new Promise((resolve) =>
      setTimeout(resolve, timeout),
    );
  }
}