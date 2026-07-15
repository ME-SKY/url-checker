import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Get(':id')
  getJobById(
    @Param('id') id: string,
  ) {
    return this.jobsService.findJobById(id);
  }

  @Post()
  createJob(
    @Body() dto: CreateJobDto,
  ) {
    const job = this.jobsService.createJob(dto);

    return {
      jobId: job.id,
    };
  }

  @Delete(':id')
  cancelJob(
    @Param('id') id: string,
  ) {
    return this.jobsService.cancelJob(id);
  }
}
