'use client';

import { useResumeStore } from '@/lib/store';
import { Field } from '../ui/Field';
import { ItemCard, Section } from '../ui/Section';
import { BulletList } from '../ui/BulletList';

export function ExperienceForm() {
  const items = useResumeStore((s) => s.resume.experience);
  const add = useResumeStore((s) => s.addExperience);
  const update = useResumeStore((s) => s.updateExperience);
  const remove = useResumeStore((s) => s.removeExperience);
  const setBullets = useResumeStore((s) => s.setExperienceBullets);

  return (
    <Section title="Experience" onAdd={add} addLabel="Experience">
      {items.length === 0 && <p className="text-sm text-slate-500">No entries yet.</p>}
      {items.map((e) => (
        <ItemCard key={e.id} onRemove={() => remove(e.id)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Field label="Title" value={e.title} onChange={(v) => update(e.id, { title: v })} />
            <Field label="Dates" value={e.dates} onChange={(v) => update(e.id, { dates: v })} placeholder="Jun 2023 -- Present" />
            <Field label="Company" value={e.company} onChange={(v) => update(e.id, { company: v })} />
            <Field label="Location" value={e.location} onChange={(v) => update(e.id, { location: v })} />
          </div>
          <BulletList bullets={e.bullets} onChange={(b) => setBullets(e.id, b)} />
        </ItemCard>
      ))}
    </Section>
  );
}
