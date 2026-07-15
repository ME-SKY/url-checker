import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './interfaces/job.interface';

@Injectable()
export class JobsService {
  private jobs: Job[] = [];

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

    return job;
  }

  getJobs() {
    return this.jobs;
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

    return job;
  }
}
