import { memo } from 'react';
import type { JobStatus } from '../../types/job';
import type { UrlCheckStatus } from '../../types/url-check';

type Status = JobStatus | UrlCheckStatus;

interface Props {
  status: Status;
}

const styles: Record<Status, string> = {
  pending: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  success: 'bg-green-100 text-green-700',
  cancelled: 'bg-orange-100 text-orange-700',
  failed: 'bg-red-100 text-red-700',
  error: 'bg-red-100 text-red-700'
};

const labels: Record<Status, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
  success: 'Success',
  cancelled: 'Cancelled',
  failed: 'Failed',
  error: 'Error'
};

export const StatusBadge = memo(function StatusBadge({ status }: Props) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
});