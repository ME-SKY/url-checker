import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { JobDetails } from './components/JobDetails';
import { useJobPolling } from './hooks/useJobPolling';
import { useJobsStore } from './store/jobs.store';

function App() {

  const activeJobId = useJobsStore((state) => state.activeJobId);
  useJobPolling();

  return (
    <div className="h-screen bg-slate-100 p-6 flex flex-col gap-6 overflow-hidden items-center">

      <h3 className="text-2xl font-bold self-center">
        URL Checker
      </h3>

      <JobForm />

      <div className="grid min-h-0 flex-1 h-full justify-center grid-cols-1 md:grid-cols-[360px_360px] gap-6 w-full md:w-auto">

        <div className={`min-h-0 list flex flex-col overflow-hidden col-start-1 row-start-1 md:col-start-1 ${activeJobId ? 'z-1' : 'z-2'}`}>
          <JobList />
        </div>

        <div className={`min-h-0 overflow-hidden col-start-1 row-start-1 md:col-start-2 ${activeJobId ? 'z-2' : 'z-1'}`}>
          <JobDetails />
        </div>
      </div>
    </div>
  );
}

export default App;