import { create } from 'zustand';
import { Test, Question } from '../types';

interface TestStore {
  tests: Test[];
  currentTest: Test | null;
  addTest: (test: Test) => void;
  setCurrentTest: (test: Test | null) => void;
}

export const useTestStore = create<TestStore>((set) => ({
  tests: [],
  currentTest: null,
  addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
  setCurrentTest: (test) => set({ currentTest: test }),
}));