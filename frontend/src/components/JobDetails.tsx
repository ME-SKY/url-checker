import { ArrowLeft } from 'lucide-react';
import { useJobsStore } from '../store/jobs.store';
import { StatusBadge } from './ui/StatusBadge';
import { UrlCard } from './UrlCard';
import { InfoItem } from './ui/InfoItem';
import { StatusCount } from './ui/StatusCount';

export function JobDetails() {
  const job = useJobsStore((state) => state.activeJob);
  const cancelJob = useJobsStore((state) => state.cancelJob);
  const setActiveJob = useJobsStore((state) => state.updateActiveJob);

  if (!job) {
    return (
      <p className="min-h-0 p-6 text-center text-gray-500">
        Select a job to see details
      </p>
    );
  }

  const completed = job.urls.filter((item) =>
    item.status === 'success' ||
    item.status === 'error'
  ).length;

  const success = job.urls.filter((item) => item.status === 'success').length;
  const error = job.urls.filter((item) => item.status === 'error').length;
  const cancelled = job.urls.filter((item) => item.status === 'cancelled').length;

  const progress = Math.round((completed / job.urls.length) * 100);


  return (
    <div className="max-h-full flex flex-col rounded-xl border bg-white p-6">
      <button onClick={() => setActiveJob(null)}
        className="md:hidden w-fit flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1.5
        text-sm text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 mb-3"
      >
        <ArrowLeft size={14} />
        Back
      </button>
      <div className="flex items-start justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold">
            Job details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {job.id}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">

          <StatusBadge
            status={job.status}
          />

          {(job.status === 'pending' ||
            job.status === 'in_progress') && (
              <button onClick={() => cancelJob(job.id)}
                className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600">
                Cancel job
              </button>
            )}
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-5">
        <InfoItem
          label="Processed"
          value={`${completed}/${job.urls.length}`}
        />

        <InfoItem
          label="Started"
          value={
            job.startedAt
              ? new Date(
                job.startedAt,
              ).toLocaleString()
              : '-'
          }
        />

        <InfoItem
          label="Finished"
          value={
            job.finishedAt
              ? new Date(
                job.finishedAt,
              ).toLocaleString()
              : '-'
          }
        />
      </div>

      {job.status === 'in_progress' &&
        <div className="mb-5">
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Progress
            </span>

            <span>
              {completed}/{job.urls.length}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="
              h-full
              rounded-full
              bg-blue-500
              transition-all
            "
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      }

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-row justify-between">
          <h3 className="mb-3 font-medium">
            URLs
          </h3>

          <div className="flex flex-row gap-2">
            <StatusCount status="success" value={success} />
            <StatusCount status="error" value={error} />
            <StatusCount status="cancelled" value={cancelled} />
          </div>
        </div>


        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 scrollbar-thin">
          {job.urls.map((urlCheck) => <UrlCard key={urlCheck.url} urlCheck={urlCheck} />)}
        </div>
      </div>
    </div>
  );
}