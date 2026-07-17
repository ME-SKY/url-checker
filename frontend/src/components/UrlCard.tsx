import { StatusBadge } from './StatusBadge';
import type { UrlCheck } from '../types/url-check';

interface UrlCardProps {
  urlCheck: UrlCheck;
}

export function UrlCard({
  urlCheck,
}: UrlCardProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        p-2
      "
    >
      <div>
        <p className="text-sm font-medium">
          {urlCheck.url}
        </p>

        {urlCheck.error && (
          <p className="text-sm text-red-500">
            {urlCheck.error}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {urlCheck.httpStatus && (
          <span className="text-sm">
            {urlCheck.httpStatus}
          </span>
        )}

        {urlCheck.duration && (
          <span className="text-sm text-gray-500">
            {urlCheck.duration}ms
          </span>
        )}

        <StatusBadge
          status={urlCheck.status}
        />
      </div>
    </div>
  );
}