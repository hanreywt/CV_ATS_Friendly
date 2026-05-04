'use client';

import { useResumeStore } from '@/lib/store';
import { Field } from '../ui/Field';
import { ItemCard, Section } from '../ui/Section';

export function SkillsForm() {
  const items = useResumeStore((s) => s.resume.skills);
  const add = useResumeStore((s) => s.addSkill);
  const update = useResumeStore((s) => s.updateSkill);
  const remove = useResumeStore((s) => s.removeSkill);

  return (
    <Section title="Technical Skills" onAdd={add} addLabel="Category">
      {items.length === 0 && <p className="text-sm text-slate-500">No entries yet.</p>}
      {items.map((s) => (
        <ItemCard key={s.id} onRemove={() => remove(s.id)}>
          <Field label="Category" value={s.category} onChange={(v) => update(s.id, { category: v })} placeholder="Languages" />
          <Field label="Items" value={s.items} onChange={(v) => update(s.id, { items: v })} placeholder="Go, TypeScript, Python" textarea />
        </ItemCard>
      ))}
    </Section>
  );
}
