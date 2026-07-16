import type { Job, JobSummary } from '../types/job';

const API_URL = 'http://localhost:3000/api/jobs';

export async function getJobs(): Promise<JobSummary[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      'Failed to fetch jobs',
    );
  }
  return response.json();
}

export async function getJobById(id: string): Promise<Job> {

  const response =
    await fetch(
      `${API_URL}/${id}`,
    );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch job',
    );
  }
  return response.json();
}

export async function createJob(urls: string[]): Promise<{ jobId: string }> {

  const response =
    await fetch(
      API_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          urls,
        }),
      },
    );

  if (!response.ok) {
    throw new Error(
      'Failed to create job',
    );
  }
  return response.json();
}

export async function cancelJob(id: string): Promise<Job> {

  const response =
    await fetch(
      `${API_URL}/${id}`,
      {
        method: 'DELETE',
      },
    );

  if (!response.ok) {
    throw new Error(
      'Failed to cancel job',
    );
  }
  return response.json();
}