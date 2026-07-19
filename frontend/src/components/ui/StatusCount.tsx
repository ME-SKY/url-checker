import { memo } from "react";
import { Check, X, Ban } from 'lucide-react';
interface Props {
  status: 'success' | 'error' | 'cancelled';
  value: number;
}

export const StatusCount = memo(function StatusCount({ status, value }: Props) {
  const config = {
    success: {
      color: 'text-green-600',
      icon: Check,
      label: 'Success',
    },
    error: {
      color: 'text-red-600',
      icon: X,
      label: 'Errors',
    },
    cancelled: {
      color: 'text-yellow-500',
      icon: Ban,
      label: 'Cancelled',
    },
  };

  const { color, icon: Icon, label } = config[status];

  return (
    <span
      className={`flex items-center gap-1 ${color}`}
      title={label}
    >
      <Icon size={14} />
      {value}
    </span>
  );
});