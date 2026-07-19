import { useEffect } from 'react';
import { useJobsStore } from '../store/jobs.store';
import { JobCard } from './JobCard';

export function JobList() {
  const activeJobId = useJobsStore((state) => state.activeJobId);
  const jobs = useJobsStore((state) => state.jobs);
  const loading = useJobsStore((state) => state.loading);

  useEffect(() => {
    useJobsStore.getState().fetchJobs();
  }, []);

  if (!loading && jobs.length === 0) {
    return <p className="p-6 text-center text-gray-500">No jobs yet.</p>
  }


  return (
    <div className="flex min-h-0 flex-col rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold mb-5">
        Jobs
      </h2>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto scrollbar-thin">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isActive={job.id === activeJobId}
            onClick={useJobsStore.getState().selectJob}
          />
        ))}
      </div>
    </div>
  );
}