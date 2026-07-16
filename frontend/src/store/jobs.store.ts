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
        set({
          loading: true,
          error: null,
        });
        const jobs = await getJobs();

        set({
          jobs,
        });

      } catch(error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : 'Unknown error',
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    async createJob(urls) {
      const {jobId} = await createJobApi(urls);

      set({
        activeJobId: jobId,
      });

      await getJobById(jobId)
        .then((job) => {
          set({
            activeJob: job,
          });
        });

      await getJobs()
        .then((jobs) => {
          set({
            jobs,
          });
        });
    },

    async selectJob(id) {
      const job = await getJobById(id);

      set({
        activeJobId: id,
        activeJob: job,
      });
    },

    async cancelJob(id) {
      const job = await cancelJobApi(id);

      set({
        activeJob: job,
      });
    },
  }));