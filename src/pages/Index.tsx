
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, SunMoon, Timer, ChevronRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { getProgress, getCompletionPercentage } from '../services/progressService';
import { Progress } from '@/components/ui/progress';
import { getVerse } from '../data/verses';
import chapters from '../data/chapters';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [readStreak, setReadStreak] = useState(0);
  const [featuredVerse, setFeaturedVerse] = useState(null);

  useEffect(() => {
    // Add staggered animation effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    const progress = getProgress();
    setCompletionPercentage(getCompletionPercentage());
    setReadStreak(progress.readStreak);

    // Get a featured verse
    const randomChapter = Math.floor(Math.random() * 18) + 1;
    const randomVerse = Math.floor(Math.random() * 10) + 1;
    setFeaturedVerse(getVerse(randomChapter, randomVerse));
    
    return () => clearTimeout(timer);
  }, []);

  const navigateToChapters = () => {
    navigate('/chapters');
  };

  const navigateToDailyVerse = () => {
    navigate('/daily-verse');
  };

  const navigateToMeditate = () => {
    navigate('/meditate');
  };

  return (
    <MobileLayout currentRoute="/">
      <div className="pt-8 px-4 pb-8">
        {/* Simple Header */}
        <div className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-serif font-medium text-earth-900 dark:text-earth-50 text-center mb-2">
            Bhagavad Gita
          </h1>
          <p className="text-earth-700 dark:text-earth-300 text-center">
            Divine wisdom for everyday life
          </p>
        </div>

        {/* Progress Card */}
        <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-sm p-4 mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-earth-800 dark:text-earth-200 font-medium">Your Progress</span>
            <span className="text-sm text-saffron-600 dark:text-saffron-400">{completionPercentage}% Complete</span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-earth-100 dark:bg-earth-700" />
          <div className="mt-2 text-sm text-earth-700 dark:text-earth-300">
            {readStreak > 0 ? (
              <span className="font-medium">{readStreak} day streak!</span>
            ) : (
              <span>Start your reading journey today</span>
            )}
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className={`grid grid-cols-1 gap-4 mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={navigateToChapters}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-sm p-5 flex items-center justify-between transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-center">
              <div className="bg-saffron-100 dark:bg-saffron-900/30 rounded-full p-3 mr-4">
                <BookOpen className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg text-earth-900 dark:text-earth-100">Chapters</span>
                <p className="text-sm text-earth-600 dark:text-earth-400">18 chapters to explore</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-earth-400 dark:text-earth-600 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={navigateToDailyVerse}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-sm p-5 flex items-center justify-between transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-center">
              <div className="bg-saffron-100 dark:bg-saffron-900/30 rounded-full p-3 mr-4">
                <SunMoon className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg text-earth-900 dark:text-earth-100">Daily Verse</span>
                <p className="text-sm text-earth-600 dark:text-earth-400">Today's wisdom</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-earth-400 dark:text-earth-600 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={navigateToMeditate}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-sm p-5 flex items-center justify-between transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-center">
              <div className="bg-saffron-100 dark:bg-saffron-900/30 rounded-full p-3 mr-4">
                <Timer className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg text-earth-900 dark:text-earth-100">Meditate</span>
                <p className="text-sm text-earth-600 dark:text-earth-400">Find peace within</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-earth-400 dark:text-earth-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Featured Verse */}
        {featuredVerse && (
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-lg font-serif font-medium text-earth-900 dark:text-earth-100 mb-4">Featured Verse</h2>
            <div className="bg-white dark:bg-earth-800 rounded-lg shadow-sm p-5 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-earth-900 dark:text-earth-100 mb-3">{featuredVerse.sanskrit}</p>
                <p className="text-earth-700 dark:text-earth-300 text-sm">{featuredVerse.english}</p>
                <div className="mt-4 text-right">
                  <button 
                    onClick={() => navigate(`/chapters/${featuredVerse.chapter}/${featuredVerse.verse}`)}
                    className="text-saffron-600 dark:text-saffron-400 text-sm inline-flex items-center transition-all duration-300 hover:translate-x-1"
                  >
                    Read more <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Index;
