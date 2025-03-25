
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Check } from 'lucide-react';
import VerseViewer from '../components/VerseViewer';
import chapters from '../data/chapters';
import { getVersesByChapter, getVerse } from '../data/verses';
import MobileLayout from '../components/MobileLayout';
import { markVerseAsRead, isVerseRead } from '../services/progressService';
import Header from '../components/Header';

const ChapterView = () => {
  const { chapterId, verseId } = useParams();
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [currentVerseNumber, setCurrentVerseNumber] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(getVerse(1, 1));
  const [isRead, setIsRead] = useState(false);
  const navigate = useNavigate();

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
          }
          navigate(`/chapters/${chapterId}/1`);
        }
      } else {
        // Invalid chapter, redirect to chapters page
        navigate('/chapters');
      }
    }
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
    }
  };

  const handleBack = () => {
    navigate('/chapters');
  };

  if (!currentVerse || !currentChapter) {
    return (
      <MobileLayout currentRoute="/chapters">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-saffron-500 flex justify-center">
              <BookOpen size={48} />
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
        <div className="mb-6">
          <div className="mt-4">
            <div className="flex justify-between items-start">
              <div className="text-left">
                <span className="text-xs font-medium bg-saffron-100 dark:bg-saffron-900/50 text-saffron-800 dark:text-saffron-300 rounded-full px-3 py-1 inline-flex items-center justify-center">
                  Chapter {currentChapter.id}
                </span>
                <h1 className="mt-2 text-2xl font-serif font-medium text-earth-900 dark:text-earth-100">
                  {currentChapter.name}
                </h1>
                <p className="mt-1 text-lg font-sanskrit text-earth-800 dark:text-earth-200">
                  {currentChapter.nameSanskrit}
                </p>
              </div>
              
              <button
                onClick={handleMarkAsRead}
                disabled={isRead}
                className={`p-2 rounded-full flex items-center justify-center ${
                  isRead 
                    ? 'bg-saffron-100 dark:bg-saffron-900/50 text-saffron-600 dark:text-saffron-400 cursor-not-allowed' 
                    : 'bg-saffron-500 text-white hover:bg-saffron-600'
                }`}
              >
                <Check size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {currentVerse && (
          <VerseViewer 
            verse={currentVerse} 
            totalVerses={currentChapter.verses}
            onNext={handleNextVerse}
            onPrevious={handlePreviousVerse}
          />
        )}
      </div>
    </MobileLayout>
  );
};

export default ChapterView;
