'use client';

type Props = {
  bullets: string[];
  onChange: (next: string[]) => void;
};

export function BulletList({ bullets, onChange }: Props) {
  const update = (i: number, v: string) => {
    const next = bullets.slice();
    next[i] = v;
    onChange(next);
  };
  const add = () => onChange([...bullets, '']);
  const remove = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-1">
      <span className="block text-xs font-medium uppercase tracking-wide text-slate-600">Bullet points</span>
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-2">
          <span className="pt-2 text-slate-400">•</span>
          <textarea
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-400"
            value={b}
            onChange={(e) => update(i, e.target.value)}
            rows={2}
            placeholder="Describe an achievement, ideally with a quantitative result."
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="rounded px-2 text-xs text-slate-500 hover:bg-slate-100 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="mt-1 text-xs font-medium text-slate-700 hover:text-slate-900"
      >
        + add bullet
      </button>
    </div>
  );
}
