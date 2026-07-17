import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { JobDetails } from './components/JobDetails';
import { useJobPolling } from './hooks/useJobPolling';

function App() {

  useJobPolling();

  return (
    <div className="h-screen bg-slate-100 p-6 flex flex-col gap-6">

      <h3 className="text-2xl font-bold self-center">
        URL Checker
      </h3>

      <JobForm className='self-center'/>

      <div className="grid min-h-0 flex-1 h-full justify-center grid-cols-[360px_360px] gap-6">

        <div className="list flex flex-col overflow-hidden">
          <JobList />
        </div>
        

        <JobDetails />

      </div>

    </div>
  );
}

export default App;