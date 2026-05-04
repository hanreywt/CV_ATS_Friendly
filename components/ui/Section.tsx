'use client';

import { ReactNode, useState } from 'react';

type Props = {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function Section({ title, onAdd, addLabel = 'Add', children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-sm font-semibold uppercase tracking-wide text-slate-700 hover:text-slate-900"
        >
          {open ? '▾' : '▸'} {title}
        </button>
        {onAdd && open && (
          <button
            type="button"
            onClick={onAdd}
            className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-slate-700"
          >
            + {addLabel}
          </button>
        )}
      </header>
      {open && <div className="space-y-4 p-4">{children}</div>}
    </section>
  );
}

export function ItemCard({
  children,
  onRemove,
}: {
  children: ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-md border border-slate-200 bg-slate-50 p-3">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 rounded px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-200 hover:text-red-600"
        aria-label="Remove"
      >
        ✕
      </button>
      <div className="space-y-2 pr-6">{children}</div>
    </div>
  );
}
