
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
        {/* Visual header with animation */}
        <div className={`text-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-saffron-100 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-12 h-12 relative z-10">
                <path fill="#E9B872" d="M256,56.4c-2.7,0-5.3,0.4-7.9,1c25.1,7,43.5,37.5,43.5,74.5c0,41.4-22.8,75-51,75s-51-33.6-51-75c0-37,18.4-67.5,43.5-74.5c-2.6-0.6-5.2-1-7.9-1c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S297.4,56.4,256,56.4z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-serif font-medium text-earth-900 leading-tight mb-2">
            श्रीमद्‍भगवद्‍गीता
          </h1>
          <p className="text-earth-700">
            Divine wisdom for everyday life
          </p>
        </div>

        {/* Progress Card with animation */}
        <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-earth-800 font-medium">Your Journey</span>
            <span className="text-sm text-saffron-600">{completionPercentage}% Complete</span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-earth-100" />
          <div className="mt-2 text-sm text-earth-700">
            {readStreak > 0 ? (
              <span className="font-medium">{readStreak} day streak!</span>
            ) : (
              <span>Start your reading journey today!</span>
            )}
          </div>
        </div>

        {/* Quick Actions with hover effects */}
        <div className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={navigateToChapters}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:bg-earth-50 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-saffron-100 rounded-full opacity-30 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <BookOpen className="h-8 w-8 text-saffron-600 mb-2 relative z-10" />
            </div>
            <span className="font-medium text-earth-900">Read Chapters</span>
            <span className="text-xs text-earth-600 mt-1">18 chapters to explore</span>
          </button>
          
          <button
            onClick={navigateToDailyVerse}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:bg-earth-50 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-saffron-100 rounded-full opacity-30 animate-pulse" style={{ animationDuration: '5s' }}></div>
              <SunMoon className="h-8 w-8 text-saffron-600 mb-2 relative z-10" />
            </div>
            <span className="font-medium text-earth-900">Verse of the Day</span>
            <span className="text-xs text-earth-600 mt-1">Daily wisdom</span>
          </button>
          
          <button
            onClick={navigateToMeditate}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:bg-earth-50 hover:shadow-md hover:scale-[1.02] col-span-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-saffron-100 rounded-full opacity-30 animate-pulse" style={{ animationDuration: '6s' }}></div>
              <Timer className="h-8 w-8 text-saffron-600 mb-2 relative z-10" />
            </div>
            <span className="font-medium text-earth-900">Meditate with Gita</span>
            <span className="text-xs text-earth-600 mt-1">Find peace within</span>
          </button>
        </div>
        
        {/* Continue Reading with animation */}
        {completionPercentage > 0 && (
          <div className={`mb-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-serif font-medium text-earth-900">Continue Reading</h2>
              <button 
                onClick={navigateToChapters}
                className="text-saffron-600 text-sm flex items-center transition-transform duration-300 hover:translate-x-1"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {chapters.slice(0, 2).map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => navigate(`/chapters/${chapter.id}/1`)}
                  className="bg-white rounded-lg shadow-sm p-4 text-left transition-all duration-300 hover:bg-earth-50 hover:shadow-md"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-medium bg-saffron-100 text-saffron-800 rounded-full px-2 py-1">
                        Chapter {chapter.id}
                      </span>
                      <h3 className="mt-2 font-serif text-lg font-medium text-earth-900">
                        {chapter.name}
                      </h3>
                      <p className="text-xs text-earth-600 mt-1">
                        {chapter.verses} verses
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-earth-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Featured Verse with glowing effect */}
        {featuredVerse && (
          <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-lg font-serif font-medium text-earth-900 mb-4">Featured Verse</h2>
            <div className="bg-white rounded-lg shadow-sm p-5 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-saffron-300 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
              </div>
              
              <div className="relative z-10">
                <p className="font-sanskrit text-earth-900 mb-3 animate-fade-in">{featuredVerse.sanskrit}</p>
                <p className="text-earth-700 text-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>{featuredVerse.english}</p>
                <div className="mt-4 text-right">
                  <button 
                    onClick={() => navigate(`/chapters/${featuredVerse.chapter}/${featuredVerse.verse}`)}
                    className="text-saffron-600 text-sm inline-flex items-center transition-all duration-300 hover:translate-x-1"
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
