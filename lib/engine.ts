'use client';

// Thin wrapper around SwiftLaTeX's PdfTeXEngine. The engine files live in
// /public/swiftlatex/. Because the engine internally constructs a Worker via
// `new Worker('swiftlatexpdftex.js')` (a relative path), we patch the global
// Worker once so the path resolves to /swiftlatex/swiftlatexpdftex.js.

declare global {
  interface Window {
    PdfTeXEngine?: any;
    __swiftlatexWorkerPatched?: boolean;
  }
}

export type CompileResult =
  | { ok: true; pdf: Uint8Array; log: string }
  | { ok: false; log: string };

let enginePromise: Promise<any> | null = null;

function patchWorkerOnce() {
  if (typeof window === 'undefined') return;
  if (window.__swiftlatexWorkerPatched) return;
  const Original = window.Worker;
  class PatchedWorker extends Original {
    constructor(url: string | URL, opts?: WorkerOptions) {
      let resolved: string | URL = url;
      if (typeof url === 'string' && !/^(https?:|\/|blob:|data:)/.test(url)) {
        resolved = `/swiftlatex/${url}`;
      }
      super(resolved, opts);
    }
  }
  window.Worker = PatchedWorker as any;
  window.__swiftlatexWorkerPatched = true;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.dataset.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export async function getEngine(): Promise<any> {
  if (enginePromise) return enginePromise;
  enginePromise = (async () => {
    patchWorkerOnce();
    await loadScript('/swiftlatex/PdfTeXEngine.js');
    if (!window.PdfTeXEngine) {
      throw new Error(
        'SwiftLaTeX engine not found on window. Did `npm run setup` succeed? ' +
          'It must download files into public/swiftlatex/.'
      );
    }
    const engine = new window.PdfTeXEngine();
    await engine.loadEngine();
    // The default endpoint (texlive2.swiftlatex.com) is offline. Point the
    // worker at the community-maintained replacement so it can fetch the
    // format file and TeX Live packages on demand.
    //
    // We post the message directly instead of calling
    // engine.setTexliveEndpoint() because that method has an upstream bug
    // (it sets this.latexWorker = undefined after posting, orphaning the
    // worker — see PdfTeXEngine.js on the gh-pages branch).
    engine.latexWorker.postMessage({
      cmd: 'settexliveurl',
      url: 'https://texlive.texlyre.org/',
    });
    return engine;
  })();
  return enginePromise;
}

export async function compileLatex(source: string): Promise<CompileResult> {
  try {
    const engine = await getEngine();
    engine.writeMemFSFile('main.tex', source);
    engine.setEngineMainFile('main.tex');
    const r = await engine.compileLaTeX();
    if (r.status !== 0 || !r.pdf) {
      return { ok: false, log: r.log || 'Compilation failed.' };
    }
    return { ok: true, pdf: r.pdf as Uint8Array, log: r.log || '' };
  } catch (err: any) {
    return { ok: false, log: err?.message || String(err) };
  }
}
