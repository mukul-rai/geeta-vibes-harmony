
import { useState, useEffect } from 'react';
import { getBookmarks, BookmarkedVerse, removeBookmark } from '../services/bookmarkService';
import { getVerse } from '../data/verses';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookmarkListProps {
  onClose: () => void;
}

const BookmarkList = ({ onClose }: BookmarkListProps) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedVerse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setBookmarks(getBookmarks());
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRemoveBookmark = (chapter: number, verse: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedBookmarks = removeBookmark(chapter, verse);
    setBookmarks(updatedBookmarks);
    
    toast({
      title: "Bookmark Removed",
      description: `Chapter ${chapter}, Verse ${verse} has been removed from your bookmarks.`,
      duration: 2000,
    });
  };
  
  const navigateToVerse = (chapter: number, verse: number) => {
    navigate(`/chapters/${chapter}/${verse}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const Header = () => {
    // Only show header with close button when used as a modal
    if (onClose === null || onClose === undefined || onClose.toString() === "() => {}") {
      return null;
    }
    
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif text-earth-900 dark:text-earth-100">Your Bookmarks</h2>
        <button 
          onClick={onClose}
          className="p-1.5 text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
        >
          <X size={18} />
        </button>
      </div>
    );
  };
  
  if (bookmarks.length === 0) {
    return (
      <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-md p-5 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Header />
        
        <div className="py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-earth-300 dark:text-earth-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-earth-600 dark:text-earth-400">No bookmarks yet</p>
          <p className="text-sm text-earth-500 dark:text-earth-500 mt-2">
            Bookmark verses to easily find them later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-md p-5 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Header />
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {bookmarks.map((bookmark, index) => {
          const verse = getVerse(bookmark.chapter, bookmark.verse);
          if (!verse) return null;
          
          return (
            <div 
              key={`${bookmark.chapter}-${bookmark.verse}`}
              onClick={() => navigateToVerse(bookmark.chapter, bookmark.verse)}
              className={`bg-earth-50 dark:bg-earth-900/50 rounded-md p-4 border border-earth-100 dark:border-earth-800 cursor-pointer hover:border-saffron-300 dark:hover:border-saffron-600 transition-all duration-300 group animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-400 rounded-full px-2 py-0.5">
                  Chapter {bookmark.chapter} · Verse {bookmark.verse}
                </span>
                <button 
                  onClick={(e) => handleRemoveBookmark(bookmark.chapter, bookmark.verse, e)}
                  className="p-1 text-earth-400 hover:text-maroon-500 dark:text-earth-500 dark:hover:text-maroon-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              
              <p className="text-sm text-earth-800 dark:text-earth-200 line-clamp-2 mb-1 font-sanskrit">
                {verse.sanskrit}
              </p>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-earth-500 dark:text-earth-500">
                  {formatDate(bookmark.date)}
                </span>
                <ChevronRight size={16} className="text-earth-400 dark:text-earth-600 group-hover:text-saffron-500 dark:group-hover:text-saffron-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkList;
