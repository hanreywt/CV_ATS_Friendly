// Downloads SwiftLaTeX engine files into public/swiftlatex/.
// SwiftLaTeX is MIT-licensed; this script just mirrors a few static assets so
// the app can run fully offline-first in the browser.
//
// Source: https://github.com/SwiftLaTeX/SwiftLaTeX
// We pull from jsDelivr, which serves files from the GitHub repo.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'swiftlatex');

// The built engine artifacts (worker JS + WASM) are published to the
// gh-pages branch of the SwiftLaTeX repo — they aren't in master.
const BASE = 'https://cdn.jsdelivr.net/gh/SwiftLaTeX/SwiftLaTeX@gh-pages';
const FILES = ['PdfTeXEngine.js', 'swiftlatexpdftex.js', 'swiftlatexpdftex.wasm'];

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function fetchFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  let allPresent = true;
  for (const f of FILES) {
    if (!(await exists(path.join(OUT, f)))) {
      allPresent = false;
      break;
    }
  }
  if (allPresent) {
    console.log('[swiftlatex] All engine files already present, skipping download.');
    return;
  }

  console.log('[swiftlatex] Downloading engine files into', OUT);
  for (const f of FILES) {
    const dest = path.join(OUT, f);
    if (await exists(dest)) {
      console.log(`  - ${f} (already exists)`);
      continue;
    }
    try {
      const bytes = await fetchFile(`${BASE}/${f}`, dest);
      console.log(`  - ${f}  ${(bytes / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`  ! Failed to fetch ${f}: ${err.message}`);
      console.error(
        '\nManual fallback: download these three files into public/swiftlatex/ from\n' +
          'https://github.com/SwiftLaTeX/SwiftLaTeX/tree/master/PdfTeXEngine\n'
      );
      process.exitCode = 1;
      return;
    }
  }
  console.log('[swiftlatex] Done.');
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
