import { useState } from 'react';
import { useJobsStore } from '../store/jobs.store';

interface JobFormProps {
  className?: string;
}

export function JobForm({ className }: JobFormProps) {
  const [urls, setUrls] = useState('');

  const createJob = useJobsStore((state) => state.createJob);
  const loading = useJobsStore((state) => state.loading);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const parsedUrls = urls.split('\n').map((url) => url.trim()).filter(Boolean);

    if (!parsedUrls.length) {
      return;
    }

    await createJob(parsedUrls);
    setUrls('');
  }

  return (
    <form onSubmit={handleSubmit} className={`max-w-120 w-full h-40 flex flex-col gap-3 ${className}`}>
      <textarea value={urls} onChange={(event) => setUrls(event.target.value)}
        placeholder={"https://google.com\nhttps://github.com\n..."} rows={8}
        className="rounded-lg border p-3 font-mono overflow-x-auto whitespace-pre resize-none" />

      <button type="submit" disabled={loading}
        className="self-center w-fit rounded-lg bg-slate-800
          px-4 py-2 text-white transition-colors hover:bg-slate-700 
          disabled:opacity-50">
        Check
      </button>
    </form>
  );
}