
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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

  return (
    <div ref={containerRef} className={`mt-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-serif font-medium text-earth-900 mb-6 text-center">
        Explore Chapters
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`chapter-card animate-fade-in opacity-0`}
            style={{ 
              animationDelay: `${(index % 3) * 0.1}s`, 
              animationFillMode: 'forwards',
              animationDuration: '0.6s'
            }}
            onClick={() => handleChapterClick(chapter.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium bg-saffron-100 text-saffron-800 rounded-full px-2 py-1">
                Chapter {chapter.id}
              </span>
              <span className="text-xs text-earth-600">
                {chapter.verses} verses
              </span>
            </div>
            
            <h3 className="font-serif text-lg font-medium text-earth-900 mb-1">
              {chapter.name}
            </h3>
            
            <p className="text-sm text-earth-700 mb-3 font-sanskrit">
              {chapter.nameSanskrit}
            </p>
            
            <p className="text-sm text-earth-600 mb-3 line-clamp-2">
              {chapter.description}
            </p>
            
            <div className="flex justify-end">
              <span className="text-saffron-700 text-sm inline-flex items-center font-medium">
                Read Chapter <ChevronRight size={16} className="ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
