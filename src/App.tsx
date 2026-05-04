import { useState } from 'react';
import { Toolbar } from '@/components/Toolbar';
import { HeadingForm } from '@/components/forms/HeadingForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { HonorsForm } from '@/components/forms/HonorsForm';
import { Preview } from '@/components/Preview';

export function App() {
  const [showEditor, setShowEditor] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <Toolbar showEditor={showEditor} onToggleEditor={() => setShowEditor((v) => !v)} />
      <div
        className={`grid flex-1 grid-cols-1 overflow-hidden ${
          showEditor ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        {showEditor && (
          <div className="space-y-4 overflow-y-auto bg-paper p-4">
            <HeadingForm />
            <ExperienceForm />
            <ProjectsForm />
            <EducationForm />
            <SkillsForm />
            <HonorsForm />
            <p className="px-1 pb-6 text-xs text-slate-500">
              Your data is stored locally in your browser. Nothing is uploaded.
            </p>
          </div>
        )}
        <div
          className={
            showEditor ? 'border-t border-slate-200 lg:border-l lg:border-t-0' : ''
          }
        >
          <Preview />
        </div>
      </div>
    </div>
  );
}
