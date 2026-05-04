'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Resume,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  HonorItem,
  Heading,
  sampleResume,
  emptyResume,
} from './types';

const uid = () => Math.random().toString(36).slice(2, 10);

type Actions = {
  setHeading: (patch: Partial<Heading>) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  setExperienceBullets: (id: string, bullets: string[]) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  setProjectBullets: (id: string, bullets: string[]) => void;

  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<SkillCategory>) => void;
  removeSkill: (id: string) => void;

  addHonor: () => void;
  updateHonor: (id: string, patch: Partial<HonorItem>) => void;
  removeHonor: (id: string) => void;

  loadJson: (data: Resume) => void;
  resetSample: () => void;
  resetEmpty: () => void;
};

type Store = { resume: Resume } & Actions;

export const useResumeStore = create<Store>()(
  persist(
    (set) => ({
      resume: sampleResume(),

      setHeading: (patch) =>
        set((s) => ({ resume: { ...s.resume, heading: { ...s.resume.heading, ...patch } } })),

      addEducation: () =>
        set((s) => ({
          resume: {
            ...s.resume,
            education: [
              ...s.resume.education,
              { id: uid(), school: '', location: '', degree: '', dates: '' },
            ],
          },
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          resume: {
            ...s.resume,
            education: s.resume.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
          },
        })),
      removeEducation: (id) =>
        set((s) => ({
          resume: { ...s.resume, education: s.resume.education.filter((e) => e.id !== id) },
        })),

      addExperience: () =>
        set((s) => ({
          resume: {
            ...s.resume,
            experience: [
              ...s.resume.experience,
              { id: uid(), title: '', dates: '', company: '', location: '', bullets: [''] },
            ],
          },
        })),
      updateExperience: (id, patch) =>
        set((s) => ({
          resume: {
            ...s.resume,
            experience: s.resume.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
          },
        })),
      removeExperience: (id) =>
        set((s) => ({
          resume: { ...s.resume, experience: s.resume.experience.filter((e) => e.id !== id) },
        })),
      setExperienceBullets: (id, bullets) =>
        set((s) => ({
          resume: {
            ...s.resume,
            experience: s.resume.experience.map((e) => (e.id === id ? { ...e, bullets } : e)),
          },
        })),

      addProject: () =>
        set((s) => ({
          resume: {
            ...s.resume,
            projects: [
              ...s.resume.projects,
              { id: uid(), name: '', tech: '', dates: '', bullets: [''] },
            ],
          },
        })),
      updateProject: (id, patch) =>
        set((s) => ({
          resume: {
            ...s.resume,
            projects: s.resume.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
          },
        })),
      removeProject: (id) =>
        set((s) => ({
          resume: { ...s.resume, projects: s.resume.projects.filter((p) => p.id !== id) },
        })),
      setProjectBullets: (id, bullets) =>
        set((s) => ({
          resume: {
            ...s.resume,
            projects: s.resume.projects.map((p) => (p.id === id ? { ...p, bullets } : p)),
          },
        })),

      addSkill: () =>
        set((s) => ({
          resume: {
            ...s.resume,
            skills: [...s.resume.skills, { id: uid(), category: '', items: '' }],
          },
        })),
      updateSkill: (id, patch) =>
        set((s) => ({
          resume: {
            ...s.resume,
            skills: s.resume.skills.map((sk) => (sk.id === id ? { ...sk, ...patch } : sk)),
          },
        })),
      removeSkill: (id) =>
        set((s) => ({
          resume: { ...s.resume, skills: s.resume.skills.filter((sk) => sk.id !== id) },
        })),

      addHonor: () =>
        set((s) => ({
          resume: { ...s.resume, honors: [...s.resume.honors, { id: uid(), text: '' }] },
        })),
      updateHonor: (id, patch) =>
        set((s) => ({
          resume: {
            ...s.resume,
            honors: s.resume.honors.map((h) => (h.id === id ? { ...h, ...patch } : h)),
          },
        })),
      removeHonor: (id) =>
        set((s) => ({
          resume: { ...s.resume, honors: s.resume.honors.filter((h) => h.id !== id) },
        })),

      loadJson: (data) => set({ resume: data }),
      resetSample: () => set({ resume: sampleResume() }),
      resetEmpty: () => set({ resume: emptyResume() }),
    }),
    { name: 'cv-maker-resume-v1' }
  )
);
