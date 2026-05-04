export type Heading = {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  location: string;
  summary: string;
};

export type EducationItem = {
  id: string;
  school: string;
  location: string;
  degree: string;
  dates: string;
};

export type ExperienceItem = {
  id: string;
  title: string;
  dates: string;
  company: string;
  location: string;
  bullets: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  tech: string;
  dates: string;
  bullets: string[];
};

export type SkillCategory = {
  id: string;
  category: string;
  items: string;
};

export type HonorItem = {
  id: string;
  text: string;
};

export type Resume = {
  heading: Heading;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  honors: HonorItem[];
};

export const emptyResume = (): Resume => ({
  heading: {
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    website: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  honors: [],
});

export const sampleResume = (): Resume => ({
  heading: {
    name: 'Rey Rey',
    phone: '+1 (555) 123-4567',
    email: 'rey.rey@example.com',
    linkedin: 'linkedin.com/in/reyrey',
    github: 'github.com/reyrey',
    website: 'reyrey.dev',
    location: 'San Francisco, CA',
    summary:
      'I know u hate updating your resume, but I promise this one will make your life easier.',
  },
  education: [
    {
      id: 'ed1',
      school: 'University of Example',
      location: 'Berkeley, CA',
      degree: 'B.S. in Computer Science',
      dates: 'Aug 2019 -- May 2023',
    },
  ],
  experience: [
    {
      id: 'ex1',
      title: 'Software Engineer',
      dates: 'Jun 2023 -- Present',
      company: 'Acme Corp',
      location: 'Remote',
      bullets: [
        'Built a distributed task scheduler handling 10M+ jobs/day in Go and Postgres.',
        'Reduced p99 API latency from 850ms to 120ms by introducing a read-through cache layer.',
        'Mentored two junior engineers; led migration of legacy auth service to OAuth 2.1.',
      ],
    },
  ],
  projects: [
    {
      id: 'pr1',
      name: 'OpenResume',
      tech: 'TypeScript, Next.js, WASM',
      dates: 'Jan 2024',
      bullets: [
        'Open-source resume builder that compiles LaTeX to PDF entirely in the browser.',
        'Supports JSON import/export and live preview with debounced recompilation.',
      ],
    },
  ],
  skills: [
    { id: 'sk1', category: 'Languages', items: 'Go, TypeScript, Python, Rust, SQL' },
    { id: 'sk2', category: 'Frameworks', items: 'Next.js, React, FastAPI, gRPC' },
    { id: 'sk3', category: 'Tools', items: 'Docker, Kubernetes, Postgres, Redis, AWS' },
  ],
  honors: [
    { id: 'ho1', text: 'Dean’s List, 2021--2023' },
    { id: 'ho2', text: 'Winner, University Hackathon 2022' },
  ],
});
