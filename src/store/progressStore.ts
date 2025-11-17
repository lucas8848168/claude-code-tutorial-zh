import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTotalChaptersCount } from '../config/chapters';

interface ProgressState {
  completedChapters: Set<string>;
  currentChapter: string | null;
  lastVisited: Date;
  totalTimeSpent: number;
  
  markChapterComplete: (chapterId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  updateTimeSpent: (minutes: number) => void;
  resetProgress: () => void;
  getProgress: () => number;
  isChapterCompleted: (chapterId: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedChapters: new Set<string>(),
      currentChapter: null,
      lastVisited: new Date(),
      totalTimeSpent: 0,
      
      markChapterComplete: (chapterId: string) => {
        set((state) => ({
          completedChapters: new Set(state.completedChapters).add(chapterId),
        }));
      },
      
      setCurrentChapter: (chapterId: string) => {
        set({
          currentChapter: chapterId,
          lastVisited: new Date(),
        });
      },
      
      updateTimeSpent: (minutes: number) => {
        set((state) => ({
          totalTimeSpent: state.totalTimeSpent + minutes,
        }));
      },
      
      resetProgress: () => {
        set({
          completedChapters: new Set<string>(),
          currentChapter: null,
          lastVisited: new Date(),
          totalTimeSpent: 0,
        });
      },
      
      getProgress: () => {
        const { completedChapters } = get();
        const totalChapters = getTotalChaptersCount();
        if (totalChapters === 0) return 0;
        return Math.round((completedChapters.size / totalChapters) * 100);
      },
      
      isChapterCompleted: (chapterId: string) => {
        return get().completedChapters.has(chapterId);
      },
    }),
    {
      name: 'progress-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const data = JSON.parse(str);
          return {
            state: {
              ...data.state,
              completedChapters: new Set(data.state.completedChapters || []),
              lastVisited: new Date(data.state.lastVisited || new Date()),
            },
          };
        },
        setItem: (name, value) => {
          const data = {
            state: {
              ...value.state,
              completedChapters: Array.from(value.state.completedChapters),
              lastVisited: value.state.lastVisited.toISOString(),
            },
          };
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
