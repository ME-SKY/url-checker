export type UrlCheckStatus =
  | 'pending'
  | 'in_progress'
  | 'success'
  | 'error'
  | 'cancelled';


export interface UrlCheck {
  url: string;
  status: UrlCheckStatus;
  httpStatus?: number;
  error?: string;
  startedAt?: string;
  finishedAt?: string;
  duration?: number;
}