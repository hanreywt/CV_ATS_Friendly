'use client';

import { useRef } from 'react';
import { useResumeStore } from '@/lib/store';
import { Resume } from '@/lib/types';

type Props = {
  showEditor: boolean;
  onToggleEditor: () => void;
};

export function Toolbar({ showEditor, onToggleEditor }: Props) {
  const resume = useResumeStore((s) => s.resume);
  const loadJson = useResumeStore((s) => s.loadJson);
  const resetSample = useResumeStore((s) => s.resetSample);
  const resetEmpty = useResumeStore((s) => s.resetEmpty);
  const fileInput = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = resume.heading.name?.trim().replace(/\s+/g, '_') || 'resume';
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text) as Resume;
      // Minimal validation: required top-level keys.
      if (!data || typeof data !== 'object' || !data.heading) {
        alert('Invalid resume JSON.');
        return;
      }
      loadJson(data);
    } catch (e) {
      alert('Could not parse JSON file.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-2">
      <h1 className="text-sm font-semibold text-slate-800">CV Maker — ATS Friendly</h1>
      <button
        type="button"
        onClick={onToggleEditor}
        className="rounded-md border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-100"
        title={showEditor ? 'Hide editor (preview only)' : 'Show editor'}
      >
        {showEditor ? '◧ Hide editor' : '◨ Show editor'}
      </button>
      <div className="ml-auto flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-100"
        >
          Import JSON
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importJson(f);
            e.currentTarget.value = '';
          }}
        />
        <button
          type="button"
          onClick={exportJson}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-100"
        >
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm('Replace current data with the sample resume?')) resetSample();
          }}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-100"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm('Erase all resume data?')) resetEmpty();
          }}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs text-red-700 hover:bg-red-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
