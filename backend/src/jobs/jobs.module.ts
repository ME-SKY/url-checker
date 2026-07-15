import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsProcessor } from './processor/job.processor';
import { UrlCheckerService } from './processor/url-checker.service';

@Module({
  controllers:[
    JobsController,
  ],
  providers:[
    JobsService,
    JobsProcessor,
    UrlCheckerService,
  ],
})
export class JobsModule {}
