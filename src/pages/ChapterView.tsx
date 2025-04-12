
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Check, BookmarkCheck, Bookmark, BarChart2 } from 'lucide-react';
import VerseViewer from '../components/VerseViewer';
import chapters from '../data/chapters';
import { getVersesByChapter, getVerse } from '../data/verses';
import MobileLayout from '../components/MobileLayout';
import { markVerseAsRead, isVerseRead } from '../services/progressService';
import { addBookmark, removeBookmark, isVerseBookmarked } from '../services/bookmarkService';
import Header from '../components/Header';
import BookmarkList from '../components/BookmarkList';
import ReadingStats from '../components/ReadingStats';
import { useToast } from '@/hooks/use-toast';

const ChapterView = () => {
  const { chapterId, verseId } = useParams();
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [currentVerseNumber, setCurrentVerseNumber] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(getVerse(1, 1));
  const [isRead, setIsRead] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (chapterId) {
      const chapterNum = parseInt(chapterId);
      const chapter = chapters.find(ch => ch.id === chapterNum);
      
      if (chapter) {
        setCurrentChapter(chapter);
        
        if (verseId) {
          const verseNum = parseInt(verseId);
          if (verseNum >= 1 && verseNum <= chapter.verses) {
            setCurrentVerseNumber(verseNum);
            const verse = getVerse(chapterNum, verseNum);
            if (verse) {
              setCurrentVerse(verse);
              setIsRead(isVerseRead(chapterNum, verseNum));
              setBookmarked(isVerseBookmarked(chapterNum, verseNum));
            }
          } else {
            // Invalid verse number, redirect to verse 1
            navigate(`/chapters/${chapterId}/1`);
          }
        } else {
          // No verse specified, show verse 1
          setCurrentVerseNumber(1);
          const verse = getVerse(chapterNum, 1);
          if (verse) {
            setCurrentVerse(verse);
            setIsRead(isVerseRead(chapterNum, 1));
            setBookmarked(isVerseBookmarked(chapterNum, 1));
          }
          navigate(`/chapters/${chapterId}/1`);
        }
      } else {
        // Invalid chapter, redirect to chapters page
        navigate('/chapters');
      }
    }
    
    // Add animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [chapterId, verseId, navigate]);

  const handleNextVerse = () => {
    if (currentVerseNumber < currentChapter.verses) {
      navigate(`/chapters/${currentChapter.id}/${currentVerseNumber + 1}`);
    }
  };

  const handlePreviousVerse = () => {
    if (currentVerseNumber > 1) {
      navigate(`/chapters/${currentChapter.id}/${currentVerseNumber - 1}`);
    }
  };

  const handleMarkAsRead = () => {
    if (chapterId && verseId) {
      markVerseAsRead(parseInt(chapterId), parseInt(verseId));
      setIsRead(true);
      toast({
        title: "Verse Marked as Read",
        description: "Your progress has been updated.",
        duration: 2000,
        className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
      });
    }
  };
  
  const toggleBookmark = () => {
    if (chapterId && verseId) {
      const chapter = parseInt(chapterId);
      const verse = parseInt(verseId);
      
      if (bookmarked) {
        removeBookmark(chapter, verse);
        setBookmarked(false);
        toast({
          title: "Bookmark Removed",
          description: `Chapter ${chapter}, Verse ${verse} has been removed from your bookmarks.`,
          duration: 2000,
          className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
        });
      } else {
        addBookmark(chapter, verse);
        setBookmarked(true);
        toast({
          title: "Bookmark Added",
          description: `Chapter ${chapter}, Verse ${verse} has been added to your bookmarks.`,
          duration: 2000,
          className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
        });
      }
    }
  };

  const handleBack = () => {
    navigate('/chapters');
  };

  if (!currentVerse || !currentChapter) {
    return (
      <MobileLayout currentRoute="/chapters">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center glass-effect p-8 rounded-xl">
            <div className="mb-4 text-saffron-500 animate-gentle-pulse">
              <BookOpen size={48} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-earth-900 dark:text-earth-100 mb-2">Loading verse...</h2>
            <p className="text-earth-700 dark:text-earth-300">Please wait while we retrieve the wisdom.</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout currentRoute="/chapters">
      <Header showBackButton={true} onBack={handleBack} />
      
      <div className="pt-16 px-4 pb-24">
        {/* Chapter Header with enhanced styling */}
        <div className={`mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-medium bg-saffron-100/80 dark:bg-saffron-900/50 text-saffron-800 dark:text-saffron-300 rounded-full px-3 py-1 shadow-sm">
                  Chapter {currentChapter.id}
                </span>
                <h1 className="mt-2 text-2xl font-serif font-medium text-earth-900 dark:text-earth-100">
                  {currentChapter.name}
                </h1>
                <p className="mt-1 text-lg font-sanskrit text-earth-800/90 dark:text-earth-200/90">
                  {currentChapter.nameSanskrit}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={toggleBookmark}
                  className={`p-2.5 rounded-full transition-all duration-300 interactive-button ${
                    bookmarked 
                      ? 'bg-saffron-100 dark:bg-saffron-900/50 text-saffron-600 dark:text-saffron-400 shadow-inner'
                      : 'bg-earth-100/80 dark:bg-earth-800/80 text-earth-600 dark:text-earth-400 hover:bg-saffron-100/80 dark:hover:bg-saffron-900/50 hover:text-saffron-600 dark:hover:text-saffron-400 shadow-sm'
                  }`}
                  aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
                
                <button
                  onClick={handleMarkAsRead}
                  disabled={isRead}
                  className={`p-2.5 rounded-full shadow-sm interactive-button ${
                    isRead 
                      ? 'bg-saffron-100/80 dark:bg-saffron-900/50 text-saffron-600 dark:text-saffron-400 cursor-not-allowed shadow-inner' 
                      : 'bg-saffron-500/90 text-white hover:bg-saffron-600'
                  }`}
                  aria-label={isRead ? "Already marked as read" : "Mark as read"}
                >
                  <Check size={18} />
                </button>
                
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="p-2.5 rounded-full bg-earth-100/80 dark:bg-earth-800/80 text-earth-600 dark:text-earth-400 hover:bg-saffron-100/80 dark:hover:bg-saffron-900/50 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors interactive-button shadow-sm"
                  aria-label="View reading stats"
                >
                  <BarChart2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats panel with smoother transitions */}
        {showStats && (
          <div className="mb-6 animate-fade-in">
            <ReadingStats onClose={() => setShowStats(false)} />
          </div>
        )}
        
        {/* Bookmarks panel with smoother transitions */}
        {showBookmarks && (
          <div className="mb-6 animate-fade-in">
            <BookmarkList onClose={() => setShowBookmarks(false)} />
          </div>
        )}
        
        {/* Enhanced Verse Viewer with smoother transitions */}
        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {currentVerse && (
            <VerseViewer 
              verse={currentVerse} 
              totalVerses={currentChapter.verses}
              onNext={handleNextVerse}
              onPrevious={handlePreviousVerse}
            />
          )}
        </div>
        
        {/* Interactive element with enhanced styling */}
        <div className={`fixed bottom-20 right-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="glass-effect shadow-lg rounded-full p-3.5 text-earth-700 dark:text-earth-300 hover:text-saffron-600 dark:hover:text-saffron-400 hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Toggle bookmarks"
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ChapterView;
