
import { useEffect } from 'react';
import ChapterList from '../components/ChapterList';
import MobileLayout from '../components/MobileLayout';
import { getCompletionPercentage } from '../services/progressService';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Sparkles } from 'lucide-react';
import FeaturedChaptersCarousel from '../components/FeaturedChaptersCarousel';

const Chapters = () => {
  const completionPercentage = getCompletionPercentage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MobileLayout currentRoute="/chapters">
      <div className="pt-8 px-4 pb-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-saffron-200 dark:bg-saffron-900/30 rounded-full animate-pulse"></div>
              <BookOpen size={24} className="relative z-10 text-saffron-600 dark:text-saffron-400 m-2" />
            </div>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-saffron-50 via-saffron-100 to-saffron-50 dark:from-saffron-900/20 dark:via-saffron-900/30 dark:to-saffron-900/20 text-saffron-800 dark:text-saffron-300 font-medium text-sm mb-3">
            Bhagavad Gita
          </span>
          <h1 className="text-2xl font-serif font-medium text-earth-900 dark:text-earth-50 mb-3 relative inline-block">
            Chapters
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saffron-300 dark:via-saffron-700 to-transparent"></span>
          </h1>
          <p className="text-earth-700 dark:text-earth-200 text-sm max-w-xs mx-auto">
            Explore all 18 chapters of divine wisdom from the sacred text
          </p>
        </div>
        
        {/* Featured Chapters Carousel */}
        <div className="mb-8">
          <FeaturedChaptersCarousel />
        </div>
        
        {/* Progress Bar with enhanced styling */}
        <div className="bg-white/80 dark:bg-earth-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-earth-100 dark:border-earth-700 p-5 mb-8 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-saffron-100 dark:bg-saffron-900/20 rounded-full opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-earth-100 dark:via-earth-700 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Sparkles size={16} className="text-saffron-500 dark:text-saffron-400 mr-2" />
              <span className="text-earth-800 dark:text-earth-100 font-medium">Your Journey</span>
            </div>
            <span className="text-sm font-medium bg-saffron-50 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-300 px-2 py-0.5 rounded-full">
              {completionPercentage}% Complete
            </span>
          </div>
          
          <div className="relative">
            <Progress value={completionPercentage} className="h-2 bg-earth-100 dark:bg-earth-700" />
            
            {completionPercentage > 0 && (
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-saffron-500 dark:bg-saffron-400 border-2 border-white dark:border-earth-800 z-10"
                style={{ left: `${completionPercentage}%` }}
              />
            )}
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-earth-500 dark:text-earth-400">
            <span>Start</span>
            <span>Chapter 18</span>
          </div>
        </div>
        
        <ChapterList />
      </div>
    </MobileLayout>
  );
};

export default Chapters;
