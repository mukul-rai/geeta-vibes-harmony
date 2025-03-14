
export interface ReadingProgress {
  completedVerses: Set<string>;
  totalVerses: number;
  readStreak: number;
  lastReadDate: string | null;
}

const PROGRESS_KEY = 'gita_reading_progress';
const TOTAL_VERSES = 700; // Approximate number of verses in Bhagavad Gita

export const getProgress = (): ReadingProgress => {
  const savedProgress = localStorage.getItem(PROGRESS_KEY);
  
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress);
    return {
      ...parsed,
      completedVerses: new Set(parsed.completedVerses)
    };
  }
  
  return {
    completedVerses: new Set(),
    totalVerses: TOTAL_VERSES,
    readStreak: 0,
    lastReadDate: null
  };
};

export const saveProgress = (progress: ReadingProgress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({
    ...progress,
    completedVerses: Array.from(progress.completedVerses)
  }));
};

export const markVerseAsRead = (chapterId: number, verseId: number) => {
  const progress = getProgress();
  const verseKey = `${chapterId}:${verseId}`;
  
  progress.completedVerses.add(verseKey);
  
  // Update streak
  const today = new Date().toDateString();
  if (progress.lastReadDate !== today) {
    if (progress.lastReadDate === new Date(Date.now() - 86400000).toDateString()) {
      // If last read was yesterday, increment streak
      progress.readStreak += 1;
    } else if (progress.lastReadDate !== new Date(Date.now()).toDateString()) {
      // If last read was not today or yesterday, reset streak
      progress.readStreak = 1;
    }
    progress.lastReadDate = today;
  }
  
  saveProgress(progress);
  return progress;
};

export const getCompletionPercentage = (): number => {
  const progress = getProgress();
  return Math.round((progress.completedVerses.size / progress.totalVerses) * 100);
};

export const isVerseRead = (chapterId: number, verseId: number): boolean => {
  const progress = getProgress();
  return progress.completedVerses.has(`${chapterId}:${verseId}`);
};
