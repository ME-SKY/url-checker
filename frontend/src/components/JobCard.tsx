import { memo } from 'react';
import type { JobSummary } from '../types/job';
import { StatusBadge } from './ui/StatusBadge';
import { StatusCount } from './ui/StatusCount';

interface Props {
  job: JobSummary;
  isActive?: boolean;
  onClick: (id: string) => void;
}

export const JobCard = memo(
  function JobCard({ job, isActive, onClick }: Props) {
    return (
      <button onClick={() => onClick(job.id)}
        className={`w-full rounded-xl border p-4 text-left transition hover:bg-slate-50
        ${isActive ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}>
        
        <div className="mb-3 flex items-center justify-between">
          <StatusBadge status={job.status} />
          <span className="text-xs text-gray-500">
            {new Date(job.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="mb-2 text-sm text-gray-600">
          {job.id}
        </div>

        <div className="flex gap-4 text-sm">
          <span>
            Total: {job.total}
          </span>

          <StatusCount status="success" value={job.success} />
          <StatusCount status="error" value={job.errors} />
        </div>
      </button>
    );
  }
);