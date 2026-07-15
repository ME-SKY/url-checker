import { JobStatus } from '../types/job-status.type';
import { UrlCheck } from './url-check.interface';

export interface Job {
  id: string;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  status: JobStatus;
  urls: UrlCheck[];
}