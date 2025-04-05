
export interface BookmarkedVerse {
  chapter: number;
  verse: number;
  date: string;
  note?: string;
}

const BOOKMARKS_KEY = 'gita_bookmarks';

export const getBookmarks = (): BookmarkedVerse[] => {
  const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
  return savedBookmarks ? JSON.parse(savedBookmarks) : [];
};

export const saveBookmarks = (bookmarks: BookmarkedVerse[]) => {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

export const addBookmark = (chapter: number, verse: number, note?: string): BookmarkedVerse[] => {
  const bookmarks = getBookmarks();
  const newBookmark: BookmarkedVerse = {
    chapter,
    verse,
    date: new Date().toISOString(),
    note
  };
  
  // Check if bookmark already exists
  const existingIndex = bookmarks.findIndex(
    b => b.chapter === chapter && b.verse === verse
  );
  
  if (existingIndex >= 0) {
    // Update existing bookmark
    bookmarks[existingIndex] = newBookmark;
  } else {
    // Add new bookmark
    bookmarks.push(newBookmark);
  }
  
  saveBookmarks(bookmarks);
  return bookmarks;
};

export const removeBookmark = (chapter: number, verse: number): BookmarkedVerse[] => {
  const bookmarks = getBookmarks();
  const filteredBookmarks = bookmarks.filter(
    b => !(b.chapter === chapter && b.verse === verse)
  );
  
  saveBookmarks(filteredBookmarks);
  return filteredBookmarks;
};

export const isVerseBookmarked = (chapter: number, verse: number): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.chapter === chapter && b.verse === verse);
};
