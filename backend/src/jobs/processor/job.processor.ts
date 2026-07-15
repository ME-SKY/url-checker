import { Injectable, Logger } from "@nestjs/common";
import { Job } from "../interfaces/job.interface";
import { UrlCheckerService } from "./url-checker.service";

@Injectable()
export class JobsProcessor {
  private readonly logger = new Logger(JobsProcessor.name);

  constructor(
    private readonly urlCheckerService: UrlCheckerService,
  ) { }

  async process(job: Job) {
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

    for (const urlCheck of job.urls) {

      this.logger.log(
        `Checking URL ${urlCheck.url} in job ${job.id}`,
      );

      if (this.isCancelled(job)) {
        return;
      }

      urlCheck.status = 'in_progress';
      urlCheck.startedAt = new Date();

      const startTime = Date.now();

      const result =
        await this.urlCheckerService.check(
          urlCheck.url,
        );

      const endTime = Date.now();

      urlCheck.finishedAt = new Date();
      urlCheck.duration =
        endTime - startTime;

      if (result.httpStatus) {
        this.logger.log(
          `${urlCheck.url} success ${result.httpStatus}`,
        );

        urlCheck.status = 'success';
        urlCheck.httpStatus =
          result.httpStatus;
      }

      if (result.error) {
        this.logger.error(
          `${urlCheck.url} failed: ${result.error}`,
        );

        urlCheck.status = 'error';
        urlCheck.error =
          result.error;
      }
    }

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

  private isCancelled(job: Job) {
    return job.status === 'cancelled';
  }
}