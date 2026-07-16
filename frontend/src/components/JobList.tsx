import { useEffect } from 'react';
import { useJobsStore } from '../store/jobs.store';
import { JobCard } from './JobCard';

export function JobList() {
  const jobs =
    useJobsStore((state) => state.jobs);

  const fetchJobs =
    useJobsStore((state) => state.fetchJobs);

  const loading =
    useJobsStore((state) => state.loading);


  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);


  return (
    <div className="flex min-h-0 flex-col rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Jobs
      </h2>

      {loading && (
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-sm text-gray-500">
          No jobs yet.
        </p>
      )}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto scrollbar-thin">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>
    </div>
  );
}