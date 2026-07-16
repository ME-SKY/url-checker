import type { JobSummary } from '../types/job';
import { useJobsStore } from '../store/jobs.store';
import { StatusBadge } from './StatusBadge';

interface Props {
  job: JobSummary;
}

export function JobCard({ job }: Props) {
  const activeJobId =
    useJobsStore((state) => state.activeJobId);

  const selectJob =
    useJobsStore((state) => state.selectJob);

  const isActive =
    activeJobId === job.id;

  return (
    <button
      onClick={() => selectJob(job.id)}
      className={`
        w-full
        rounded-xl
        border
        p-4
        text-left
        transition
        hover:bg-slate-50
        ${isActive
          ? 'border-blue-500 bg-blue-50'
          : 'bg-white'
        }
      `}
    >
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

        <span className="text-green-600">
          ✓ {job.success}
        </span>

        <span className="text-red-600">
          ✕ {job.errors}
        </span>
      </div>
    </button>
  );
}