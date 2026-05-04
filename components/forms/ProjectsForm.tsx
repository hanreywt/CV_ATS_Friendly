'use client';

import { useResumeStore } from '@/lib/store';
import { Field } from '../ui/Field';
import { ItemCard, Section } from '../ui/Section';
import { BulletList } from '../ui/BulletList';

export function ProjectsForm() {
  const items = useResumeStore((s) => s.resume.projects);
  const add = useResumeStore((s) => s.addProject);
  const update = useResumeStore((s) => s.updateProject);
  const remove = useResumeStore((s) => s.removeProject);
  const setBullets = useResumeStore((s) => s.setProjectBullets);

  return (
    <Section title="Projects" onAdd={add} addLabel="Project">
      {items.length === 0 && <p className="text-sm text-slate-500">No entries yet.</p>}
      {items.map((p) => (
        <ItemCard key={p.id} onRemove={() => remove(p.id)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Field label="Project name" value={p.name} onChange={(v) => update(p.id, { name: v })} />
            <Field label="Dates" value={p.dates} onChange={(v) => update(p.id, { dates: v })} />
            <div className="md:col-span-2">
              <Field label="Tech / tags" value={p.tech} onChange={(v) => update(p.id, { tech: v })} placeholder="React, Node.js, Postgres" />
            </div>
          </div>
          <BulletList bullets={p.bullets} onChange={(b) => setBullets(p.id, b)} />
        </ItemCard>
      ))}
    </Section>
  );
}
