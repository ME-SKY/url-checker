import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './interfaces/job.interface';
import { JobsProcessor } from './processor/job.processor';
import { JobSummaryDto } from './dto/job-summary.dto';

@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  constructor(
    private readonly jobsProcessor: JobsProcessor,
  ) { }

  createJob(dto: CreateJobDto) {
    const job: Job = {
      id: randomUUID(),

      createdAt: new Date(),

      status: 'pending',

      urls: dto.urls.map((url) => ({
        url,
        status: 'pending',
      })),
    };

    this.jobs.push(job);

    void this.jobsProcessor.process(job);

    return job;
  }

  getJobs(): JobSummaryDto[] {
    return this.jobs.map((job) => {
      const success =
        job.urls.filter(
          (url) => url.status === 'success'
        ).length;

      const errors =
        job.urls.filter(
          (url) => url.status === 'error'
        ).length;

      return {
        id: job.id,
        createdAt: job.createdAt,
        status: job.status,
        total: job.urls.length,
        success,
        errors,
      };
    });
  }

  findJobById(id: string): Job {
    const job = this.jobs.find(
      (job) => job.id === id,
    );

    if (!job) {
      throw new NotFoundException(
        'Job not found',
      );
    }

    return job;
  }

  cancelJob(id: string): Job {
    const job = this.findJobById(id);
    job.status = 'cancelled';
    this.jobsProcessor.cancel(id);

    job.urls.forEach((urlCheck) => {
      if (urlCheck.status === 'pending' || urlCheck.status === 'in_progress') {
        urlCheck.status = 'cancelled';
      }
    });
    return job;
  }
}
