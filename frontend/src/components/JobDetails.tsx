import { useJobsStore } from '../store/jobs.store';
import { StatusBadge } from './StatusBadge';

export function JobDetails() {
  const job = useJobsStore((state) => state.activeJob);
  const cancelJob = useJobsStore((state) => state.cancelJob);

  if (!job) {
    return (
      <div className="rounded-xl border bg-white p-6 max-h-20">
        <p className="text-gray-500">
          Select a job to see details
        </p>
      </div>
    );
  }

  const completed = job.urls.filter((item) =>
    item.status === 'success' ||
    item.status === 'error'
  ).length;

  const progress = Math.round((completed / job.urls.length) * 100);


  return (
    <div className="h-fit space-y-6 rounded-xl border bg-white p-6">
      <div className="flex items-start justify-between">
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


      <div className="grid grid-cols-3 gap-4">

        <InfoItem
          label="Total URLs"
          value={job.urls.length}
        />

        <InfoItem
          label="Processed"
          value={`${completed}/${job.urls.length}`}
        />

        <InfoItem
          label="Created"
          value={
            new Date(
              job.createdAt,
            ).toLocaleString()
          }
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


      <div>
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
          />

        </div>

      </div>


      <div>
        <h3 className="mb-3 font-medium">
          URLs
        </h3>

        <div className="space-y-2">

          {job.urls.map((urlCheck) => (
            <div
              key={urlCheck.url}
              className="
                flex
                items-center
                justify-between
                rounded-lg
                border
                p-3
              "
            >

              <div>
                <p className="text-sm font-medium">
                  {urlCheck.url}
                </p>

                {urlCheck.error && (
                  <p className="text-sm text-red-500">
                    {urlCheck.error}
                  </p>
                )}

              </div>

              <div className="flex items-center gap-3">
                {urlCheck.httpStatus && (
                  <span className="text-sm">
                    {urlCheck.httpStatus}
                  </span>
                )}

                {urlCheck.duration && (
                  <span className="text-sm text-gray-500">
                    {urlCheck.duration}ms
                  </span>
                )}

                <StatusBadge
                  status={
                    urlCheck.status
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}