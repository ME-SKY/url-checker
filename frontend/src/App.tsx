import './App.css'
import { useState } from 'react';
import { getJobs } from './api/jobs.api';
import type { JobSummary } from './types/job';

function App() {
  const [jobs, setJobs] = useState<JobSummary[]>([]);

  async function handleClick() {
    try {
      const data = await getJobs();

      setJobs(data);

      console.log(data);

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <button onClick={handleClick}>
        Load jobs
      </button>

      <pre>
        {JSON.stringify(jobs,
          null,
          2,
        )}
      </pre>
    </div>
  );
}

export default App
