
import { useEffect } from 'react';
import ChapterList from '../components/ChapterList';
import MobileLayout from '../components/MobileLayout';
import { getCompletionPercentage } from '../services/progressService';
import { Progress } from '@/components/ui/progress';

const Chapters = () => {
  const completionPercentage = getCompletionPercentage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MobileLayout currentRoute="/chapters">
      <div className="pt-8 px-4 pb-8">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-saffron-100 text-saffron-800 font-medium text-sm mb-3">
            Bhagavad Gita
          </span>
          <h1 className="text-2xl font-serif font-medium text-earth-900 mb-3">
            Chapters
          </h1>
          <p className="text-earth-700 text-sm">
            Explore all 18 chapters of divine wisdom
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-earth-800 font-medium">Your Progress</span>
            <span className="text-sm text-saffron-600">{completionPercentage}% Complete</span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-earth-100" />
        </div>
        
        <ChapterList />
      </div>
    </MobileLayout>
  );
};

export default Chapters;
