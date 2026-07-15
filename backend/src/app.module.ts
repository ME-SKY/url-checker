import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { JobsService } from './jobs/jobs.service';
import { JobsController } from './jobs/jobs.controller';

@Module({
  imports: [JobsModule],
  // controllers: [JobsController],
  // providers: [JobsService],
})
export class AppModule {}
