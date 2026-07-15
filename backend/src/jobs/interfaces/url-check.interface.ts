import { UrlStatus } from '../types/url-status.type';

export interface UrlCheck {
  url: string;
  status: UrlStatus;
  httpStatus?: number;
  error?: string;
  startedAt?: Date;
  finishedAt?: Date;
  duration?: number;
}