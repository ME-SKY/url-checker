import { create } from 'zustand';
import type { Job, JobSummary } from '../types/job';

import {
  getJobs,
  getJobById,
  createJob as createJobApi,
  cancelJob as cancelJobApi,
} from '../api/jobs.api';


interface JobsState {
  jobs: JobSummary[];
  activeJobId: string | null;
  activeJob: Job | null;
  loading: boolean;
  error: string | null;

  fetchJobs: () => Promise<void>;

  createJob: (
    urls: string[],
  ) => Promise<void>;

  selectJob: (
    id: string,
  ) => Promise<void>;

  cancelJob: (
    id: string,
  ) => Promise<void>;

  updateActiveJob: (
    job: Job | null,
  ) => void;
}

export const useJobsStore =
  create<JobsState>((set) => ({
    jobs: [],
    activeJobId: null,
    activeJob: null,
    loading: false,
    error: null,

    async fetchJobs() {
      try {
        set({ loading: true, error: null });

        const jobs = await getJobs();

        set((state) => ({
          jobs: mergeJobs(
            state.jobs,
            jobs,
          ),
        }));

        set({ jobs });
      } catch (error) {
        set({
          error: error instanceof Error
            ? error.message
            : 'Unknown error',
        });
      } finally {
        set({ loading: false });
      }
    },

    async createJob(urls) {
      try {
        set({ loading: true, error: null });

        const { jobId } = await createJobApi(urls);
        const job = await getJobById(jobId);
        const jobs = await getJobs();

        set((state) => ({
          jobs: mergeJobs(
            state.jobs,
            jobs,
          ),
          activeJobId: jobId,
          activeJob: job,
        }));
      } catch (error) {
        set({
          error: error instanceof Error
            ? error.message
            : 'Unknown error',
        });
      } finally {
        set({ loading: false });
      }
    },

    async selectJob(id) {
      try {
        set({ loading: true, error: null });

        const job = await getJobById(id);

        set({
          activeJobId: id,
          activeJob: job,
        });
      } catch (error) {
        set({
          error: error instanceof Error
            ? error.message
            : 'Unknown error',
        });
      } finally {
        set({ loading: false });
      }
    },

    async cancelJob(id) {
      try {
        set({ loading: true, error: null });

        const job = await cancelJobApi(id);
        const jobs = await getJobs();

        set((state) => ({
          jobs: mergeJobs(
            state.jobs,
            jobs,
          ),
          activeJob: job,
          activeJobId: job.id
        }));

      } catch (error) {
        set({
          error: error instanceof Error
            ? error.message
            : 'Unknown error',
        });
      } finally {
        set({ loading: false });
      }
    },

    updateActiveJob(job) {
      set({
        activeJob: job,
        activeJobId: job ? job.id : job
      });
    }
  }));

function mergeJobs(oldJobs: JobSummary[], newJobs: JobSummary[]) {
  const oldMap = new Map(
    oldJobs.map(job => [job.id, job])
  );

  return newJobs.map((newJob) => {
    const oldJob = oldMap.get(newJob.id);

    if (
      oldJob &&
      oldJob.status === newJob.status &&
      oldJob.success === newJob.success &&
      oldJob.errors === newJob.errors
    ) {
      return oldJob;
    }
    return newJob;
  });
}