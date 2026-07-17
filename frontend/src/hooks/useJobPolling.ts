import { useEffect } from 'react';

import { getJobById } from '../api/jobs.api';
import { useJobsStore } from '../store/jobs.store';
import type { JobStatus } from '../types/job';

function isJobFinished(
  status: JobStatus,
) {
  return (
    status === 'completed' ||
    status === 'cancelled' ||
    status === 'failed'
  );
}

export function useJobPolling() {
  const activeJobId = useJobsStore((state) => state.activeJobId);
  const updateActiveJob = useJobsStore((state) => state.updateActiveJob);

  useEffect(() => {
    if (!activeJobId) {
      return
    };

    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const jobId = activeJobId;

    async function poll() {
      try {
        const job = await getJobById(jobId);

        if (cancelled) {
          return;
        }

        updateActiveJob(job);

        if (!isJobFinished(job.status)) {
          timeout = setTimeout(poll, 2000);
        }

      } catch (error) {
        console.error(error);
      }
    }

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };

  }, [activeJobId, updateActiveJob]);
}