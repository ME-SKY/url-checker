import type { UrlCheck } from './url-check';

export type JobStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'failed';

export interface Job {
  id: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  status: JobStatus;
  urls: UrlCheck[];
}

export interface JobSummary {
  id: string;
  createdAt: string;
  status: JobStatus;
  total: number;
  success: number;
  errors: number;
}