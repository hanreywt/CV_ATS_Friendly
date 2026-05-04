'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useResumeStore } from '@/lib/store';
import { generateLatex } from '@/lib/latex';
import { compileLatex } from '@/lib/engine';

type Mode = 'pdf' | 'latex' | 'log';

export function Preview() {
  const resume = useResumeStore((s) => s.resume);
  const source = useMemo(() => generateLatex(resume), [resume]);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [log, setLog] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'compiling' | 'ok' | 'error'>('idle');
  const [mode, setMode] = useState<Mode>('pdf');
  const lastUrl = useRef<string | null>(null);
  const pdfBytes = useRef<Uint8Array | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setStatus('compiling');
      const result = await compileLatex(source);
      if (result.ok) {
        pdfBytes.current = result.pdf;
        const blob = new Blob([result.pdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
        lastUrl.current = url;
        setPdfUrl(url);
        setLog(result.log);
        setStatus('ok');
      } else {
        setLog(result.log);
        setStatus('error');
      }
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [source]);

  useEffect(() => {
    return () => {
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
    };
  }, []);

  const downloadPdf = () => {
    if (!pdfBytes.current) return;
    const blob = new Blob([pdfBytes.current], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = resume.heading.name?.trim().replace(/\s+/g, '_') || 'resume';
    a.download = `${name}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTex = () => {
    const blob = new Blob([source], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = resume.heading.name?.trim().replace(/\s+/g, '_') || 'resume';
    a.download = `${name}.tex`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2">
        <div className="flex overflow-hidden rounded-md border border-slate-300 text-xs">
          {(['pdf', 'latex', 'log'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-1 ${mode === m ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="ml-2 text-xs">
          {status === 'compiling' && <span className="text-slate-500">Compiling…</span>}
          {status === 'ok' && <span className="text-emerald-600">Up to date</span>}
          {status === 'error' && <span className="text-red-600">Compile error — see LOG</span>}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={downloadTex}
            className="rounded-md border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-100"
          >
            Download .tex
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={!pdfBytes.current}
            className="rounded-md bg-slate-900 px-2.5 py-1 text-xs text-white hover:bg-slate-700 disabled:opacity-50"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-slate-100">
        {mode === 'pdf' &&
          (pdfUrl ? (
            <iframe title="PDF preview" src={pdfUrl} className="h-full w-full border-0" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              {status === 'compiling' ? 'Compiling first PDF…' : 'No PDF yet.'}
            </div>
          ))}
        {mode === 'latex' && (
          <pre className="h-full w-full overflow-auto bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
            {source}
          </pre>
        )}
        {mode === 'log' && (
          <pre className="h-full w-full overflow-auto bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
            {log || 'No log yet.'}
          </pre>
        )}
      </div>
    </div>
  );
}
