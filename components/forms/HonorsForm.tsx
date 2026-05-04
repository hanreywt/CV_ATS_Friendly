'use client';

import { useResumeStore } from '@/lib/store';
import { Field } from '../ui/Field';
import { ItemCard, Section } from '../ui/Section';

export function HonorsForm() {
  const items = useResumeStore((s) => s.resume.honors);
  const add = useResumeStore((s) => s.addHonor);
  const update = useResumeStore((s) => s.updateHonor);
  const remove = useResumeStore((s) => s.removeHonor);

  return (
    <Section title="Honors & Awards" onAdd={add} addLabel="Honor">
      {items.length === 0 && <p className="text-sm text-slate-500">No entries yet.</p>}
      {items.map((h) => (
        <ItemCard key={h.id} onRemove={() => remove(h.id)}>
          <Field label="Honor / award" value={h.text} onChange={(v) => update(h.id, { text: v })} textarea />
        </ItemCard>
      ))}
    </Section>
  );
}
