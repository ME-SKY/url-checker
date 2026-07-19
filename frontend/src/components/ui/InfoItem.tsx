import { memo } from 'react';

export const InfoItem = memo(function InfoItem({label, value}: {label: string, value: string | number}) {
  return (
    <div className="rounded-lg bg-slate-50 p-2 text-xs">
      <p className=" text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
});