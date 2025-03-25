
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Feather } from 'lucide-react';
import chapters, { Chapter } from '../data/chapters';

interface ChapterListProps {
  className?: string;
}

const ChapterList = ({ className = '' }: ChapterListProps) => {
  const [visibleChapters, setVisibleChapters] = useState<Chapter[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleChapters(chapters);
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChapterClick = (chapterId: number) => {
    navigate(`/chapters/${chapterId}`);
  };

  // Function to get a random decoration style for each card
  const getCardStyle = (index: number) => {
    const styles = [
      "border-t-4 border-t-saffron-400",
      "border-l-4 border-l-saffron-400",
      "border-r-4 border-r-saffron-400",
      "border-b-4 border-b-saffron-400",
      "bg-gradient-to-br from-white to-saffron-50 dark:from-earth-800 dark:to-earth-900",
      "bg-gradient-to-tr from-white to-saffron-50 dark:from-earth-800 dark:to-earth-900",
    ];
    
    return styles[index % styles.length];
  };

  return (
    <div ref={containerRef} className={`mt-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-serif font-medium text-earth-900 dark:text-earth-50 mb-6 text-center relative">
        <span className="relative z-10">Explore Chapters</span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-saffron-400 to-transparent"></span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`chapter-card animate-fade-in opacity-0 backdrop-blur-sm ${getCardStyle(index)}`}
            style={{ 
              animationDelay: `${(index % 3) * 0.1}s`, 
              animationFillMode: 'forwards',
              animationDuration: '0.6s'
            }}
            onClick={() => handleChapterClick(chapter.id)}
          >
            {/* Visual embellishment - decorative element */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-10">
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-saffron-400"></div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium bg-saffron-100 text-saffron-800 dark:bg-saffron-900/30 dark:text-saffron-300 rounded-full px-2 py-1 flex items-center">
                <Feather size={12} className="mr-1" /> Chapter {chapter.id}
              </span>
              <span className="text-xs text-earth-600 dark:text-earth-300 bg-earth-100/80 dark:bg-earth-800/50 px-2 py-1 rounded-full">
                {chapter.verses} verses
              </span>
            </div>
            
            <h3 className="font-serif text-lg font-medium text-earth-900 dark:text-earth-50 mb-1">
              {chapter.name}
            </h3>
            
            <p className="text-sm text-earth-700 dark:text-earth-200 mb-3 font-sanskrit">
              {chapter.nameSanskrit}
            </p>
            
            <p className="text-sm text-earth-600 dark:text-earth-300 mb-3 line-clamp-2">
              {chapter.description}
            </p>
            
            <div className="flex justify-end">
              <span className="text-saffron-600 dark:text-saffron-400 text-sm inline-flex items-center font-medium group">
                Read Chapter 
                <span className="ml-1 w-5 h-5 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center group-hover:bg-saffron-200 dark:group-hover:bg-saffron-800/50 transition-colors">
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
