import { JobStatus } from '../types/job-status.type';

export class JobSummaryDto {
  id!: string;
  createdAt!: Date;
  status!: JobStatus;
  total!: number;
  success!: number;
  errors!: number;
}