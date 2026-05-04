'use client';

import { ChangeEvent } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
};

export function Field({ label, value, onChange, placeholder, textarea, rows = 2 }: Props) {
  const common =
    'w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400';
  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value);

  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-600">{label}</span>
      {textarea ? (
        <textarea className={common} value={value} onChange={handle} placeholder={placeholder} rows={rows} />
      ) : (
        <input className={common} value={value} onChange={handle} placeholder={placeholder} />
      )}
    </label>
  );
}
