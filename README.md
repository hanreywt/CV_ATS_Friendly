# CV ATS Friendly

An ATS-friendly CV and resume builder that runs entirely in the browser. Fill in structured sections, preview a clean LaTeX-generated PDF, and export either the finished PDF or the generated `.tex` source.

The app is based on the popular [`sb2nov/resume`](https://github.com/sb2nov/resume) LaTeX style and compiles locally with [SwiftLaTeX](https://github.com/SwiftLaTeX/SwiftLaTeX), so your resume data stays on your machine.

## Features

- Structured editor for heading, education, experience, projects, skills, and honors.
- Live PDF preview powered by in-browser LaTeX compilation.
- Tabs for PDF preview, generated LaTeX source, and compile logs.
- Local autosave with `localStorage`.
- JSON import and export for backing up or reusing resume data.
- Download options for `.pdf` and `.tex`.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Zustand
- SwiftLaTeX / pdfTeX WASM

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173`.

## SwiftLaTeX Setup

The `postinstall` script downloads the SwiftLaTeX engine files into `public/swiftlatex/`.

If install scripts were skipped, run:

```bash
npm run setup
```

This fetches:

- `PdfTeXEngine.js`
- `swiftlatexpdftex.js`
- `swiftlatexpdftex.wasm`

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## How It Works

Resume data is stored in a Zustand store and persisted in `localStorage`. On each edit, `lib/latex.ts` generates a complete LaTeX document from the form data. SwiftLaTeX compiles that document inside a Web Worker, and the resulting PDF is displayed in the preview pane.

## Deployment Notes

SwiftLaTeX needs cross-origin isolation headers for `SharedArrayBuffer` support:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

The Vite config sets these headers for local development and preview. Static hosts such as Vercel or Netlify can also be configured to send them.

## License

MIT. The LaTeX resume template is based on [`sb2nov/resume`](https://github.com/sb2nov/resume), which is also MIT licensed. SwiftLaTeX is MIT licensed.
