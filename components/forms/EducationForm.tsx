'use client';

import { useResumeStore } from '@/lib/store';
import { Field } from '../ui/Field';
import { ItemCard, Section } from '../ui/Section';

export function EducationForm() {
  const items = useResumeStore((s) => s.resume.education);
  const add = useResumeStore((s) => s.addEducation);
  const update = useResumeStore((s) => s.updateEducation);
  const remove = useResumeStore((s) => s.removeEducation);

  return (
    <Section title="Education" onAdd={add} addLabel="Education">
      {items.length === 0 && <p className="text-sm text-slate-500">No entries yet.</p>}
      {items.map((e) => (
        <ItemCard key={e.id} onRemove={() => remove(e.id)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Field label="School" value={e.school} onChange={(v) => update(e.id, { school: v })} />
            <Field label="Location" value={e.location} onChange={(v) => update(e.id, { location: v })} />
            <Field label="Degree" value={e.degree} onChange={(v) => update(e.id, { degree: v })} />
            <Field label="Dates" value={e.dates} onChange={(v) => update(e.id, { dates: v })} placeholder="Aug 2019 -- May 2023" />
          </div>
        </ItemCard>
      ))}
    </Section>
  );
}
