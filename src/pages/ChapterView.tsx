
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import VerseViewer from '../components/VerseViewer';
import chapters from '../data/chapters';
import { getVersesByChapter, getVerse } from '../data/verses';

const ChapterView = () => {
  const { chapterId, verseId } = useParams();
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [currentVerseNumber, setCurrentVerseNumber] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(getVerse(1, 1));
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

  if (!currentVerse || !currentChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-saffron-500">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-earth-900 mb-2">Loading verse...</h2>
          <p className="text-earth-700">Please wait while we retrieve the wisdom.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <button 
              onClick={() => navigate('/chapters')}
              className="inline-flex items-center text-earth-700 hover:text-saffron-700 transition-colors"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back to Chapters
            </button>
            
            <div className="mt-4">
              <span className="text-xs font-medium bg-saffron-100 text-saffron-800 rounded-full px-3 py-1">
                Chapter {currentChapter.id}
              </span>
              <h1 className="mt-2 text-2xl md:text-3xl font-serif font-medium text-earth-900">
                {currentChapter.name}
              </h1>
              <p className="mt-1 text-lg font-sanskrit text-earth-800">
                {currentChapter.nameSanskrit}
              </p>
              <p className="mt-3 text-earth-700 max-w-3xl">
                {currentChapter.description}
              </p>
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
          
          <div className="mt-12 flex justify-between">
            <button 
              onClick={handlePreviousVerse}
              disabled={currentVerseNumber === 1}
              className={`px-4 py-2 rounded ${
                currentVerseNumber === 1
                  ? 'bg-earth-100 text-earth-400 cursor-not-allowed'
                  : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
              }`}
            >
              Previous Verse
            </button>
            
            <button 
              onClick={handleNextVerse}
              disabled={currentVerseNumber === currentChapter.verses}
              className={`px-4 py-2 rounded ${
                currentVerseNumber === currentChapter.verses
                  ? 'bg-earth-100 text-earth-400 cursor-not-allowed'
                  : 'bg-saffron-600 text-white hover:bg-saffron-700'
              }`}
            >
              Next Verse
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-earth-900 text-earth-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-serif text-xl font-medium text-white">श्रीमद्‍भगवद्‍गीता</h3>
              <p className="mt-1 text-sm text-earth-300">Ancient wisdom for the modern soul</p>
            </div>
            
            <div className="text-sm text-earth-400">
              &copy; {new Date().getFullYear()} Bhagavad Gita App. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChapterView;
