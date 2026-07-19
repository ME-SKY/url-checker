import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { StatusBadge } from './ui/StatusBadge';
import type { UrlCheck } from '../types/url-check';

interface UrlCardProps {
  urlCheck: UrlCheck;
}

export function UrlCard({ urlCheck }: UrlCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(urlCheck.url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }


  return (
    <div className="flex min-h-16 items-start gap-2 rounded-lg border
        bg-white p-2.5 transition-colors hover:bg-slate-50">

      <div className="min-w-0 flex-1">
        <div
          className="flex min-w-0 items-center gap-1">

          <p className="min-w-0 max-w-full truncate font-mono text-sm text-slate-800"
            title={urlCheck.url}>
            {urlCheck.url}
          </p>


          <button type="button" onClick={handleCopy}
            className="shrink-0 rounded p-1 text-slate-400 transition-colors
              hover:bg-slate-200 hover:text-slate-700"
            title="Copy URL"
          >
            {copied ? (
              <Check size={15} />
            ) : (
              <Copy size={15} />
            )}
          </button>
        </div>


        <div
          className="
            mt-1
            flex
            items-center
            gap-3
            text-xs
            text-slate-500
          "
        >

          {urlCheck.httpStatus && (
            <span>
              HTTP {urlCheck.httpStatus}
            </span>
          )}


          {urlCheck.duration && (
            <span>
              {urlCheck.duration} ms
            </span>
          )}

        </div>
      </div>
      
      <div className="flex shrink-0 flex-col items-end">

        <StatusBadge status={urlCheck.status}/>

        <p className="
            mt-1
            h-4
            w-full
            truncate
            text-right
            text-xs
            text-red-500
          "
          title={urlCheck.error}
        >
          {urlCheck.error || ''}
        </p>

      </div>

    </div>
  );
};