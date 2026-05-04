'use client';

import { useResumeStore } from '@/lib/store';
import { Field } from '../ui/Field';
import { Section } from '../ui/Section';

export function HeadingForm() {
  const heading = useResumeStore((s) => s.resume.heading);
  const setHeading = useResumeStore((s) => s.setHeading);

  return (
    <Section title="Heading">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field label="Full name" value={heading.name} onChange={(v) => setHeading({ name: v })} />
        <Field label="Location" value={heading.location} onChange={(v) => setHeading({ location: v })} />
        <Field label="Phone" value={heading.phone} onChange={(v) => setHeading({ phone: v })} />
        <Field label="Email" value={heading.email} onChange={(v) => setHeading({ email: v })} />
        <Field label="LinkedIn" value={heading.linkedin} onChange={(v) => setHeading({ linkedin: v })} placeholder="linkedin.com/in/you" />
        <Field label="GitHub" value={heading.github} onChange={(v) => setHeading({ github: v })} placeholder="github.com/you" />
        <Field label="Website" value={heading.website} onChange={(v) => setHeading({ website: v })} placeholder="you.dev" />
      </div>
      <Field
        label="Summary / about me"
        value={heading.summary ?? ''}
        onChange={(v) => setHeading({ summary: v })}
        placeholder="2–3 sentences: who you are, what you do, what you're best at."
        textarea
        rows={3}
      />
    </Section>
  );
}
