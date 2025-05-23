import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, SunMoon, Timer, ChevronRight, Feather, Quote, Heart, Star, TrendingUp, HeartHandshake, Sparkles } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { getProgress, getCompletionPercentage } from '../services/progressService';
import { Progress } from '@/components/ui/progress';
import { getVerse } from '../data/verses';
import chapters from '../data/chapters';
import MadeWithLove from '@/components/MadeWithLove';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [readStreak, setReadStreak] = useState(0);
  const [featuredVerse, setFeaturedVerse] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    const progress = getProgress();
    setCompletionPercentage(getCompletionPercentage());
    setReadStreak(progress.readStreak);

    const randomChapter = Math.floor(Math.random() * 18) + 1;
    const randomVerse = Math.floor(Math.random() * 10) + 1;
    setFeaturedVerse(getVerse(randomChapter, randomVerse));
    
    const recommendedChapters = [
      chapters.find(c => c.id === 2), // Knowledge
      chapters.find(c => c.id === 12), // Devotion
      chapters.find(c => c.id === 6), // Meditation
    ];
    setRecommendations(recommendedChapters);
    
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
        <div className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-6 text-saffron-500/20 dark:text-saffron-400/20 text-6xl font-serif">॥ॐ॥</div>
            <h1 className="text-3xl font-serif font-medium text-earth-900 dark:text-earth-50 text-center mb-2 relative z-10">
              <span className="bg-gradient-to-r from-saffron-600 to-maroon-600 bg-clip-text text-transparent dark:from-saffron-400 dark:to-maroon-400">
                Bhagavad Gita
              </span>
            </h1>
            <p className="text-earth-700 dark:text-earth-300 text-center">
              Divine wisdom for everyday life
            </p>
            <div className="w-24 h-1 mt-3 bg-gradient-to-r from-transparent via-saffron-400 to-transparent"></div>
          </div>
        </div>

        <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-md border border-earth-100 dark:border-earth-700 p-5 mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-saffron-500 dark:text-saffron-400 mr-2" />
              <span className="text-earth-800 dark:text-earth-200 font-medium">Your Journey</span>
            </div>
            <span className="text-sm font-medium text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-900/30 px-2 py-1 rounded-full">
              {completionPercentage}% Complete
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-earth-100 dark:bg-earth-700" />
          
          <div className="mt-3 flex items-center">
            {readStreak > 0 ? (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center mr-2">
                  <Feather className="h-4 w-4 text-saffron-500 dark:text-saffron-400" />
                </div>
                <span className="text-sm font-medium text-earth-800 dark:text-earth-200">
                  {readStreak} day reading streak!
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center mr-2">
                  <Feather className="h-4 w-4 text-saffron-500 dark:text-saffron-400" />
                </div>
                <span className="text-sm text-earth-700 dark:text-earth-300">
                  Start your reading journey today
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-4 mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={navigateToChapters}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-md border border-earth-100 dark:border-earth-700 p-5 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-saffron-300 dark:hover:border-saffron-600 group relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-saffron-100/50 dark:bg-saffron-900/10 rounded-bl-full -mr-6 -mt-6 z-0"></div>
            <div className="flex items-center relative z-10">
              <div className="bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/30 rounded-full p-3 mr-4 shadow-sm">
                <BookOpen className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg text-earth-900 dark:text-earth-100">Chapters</span>
                <p className="text-sm text-earth-600 dark:text-earth-400">18 chapters to explore</p>
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-full bg-earth-50 dark:bg-earth-700 flex items-center justify-center group-hover:bg-saffron-100 dark:group-hover:bg-saffron-800/50 transition-colors">
                <ChevronRight className="h-5 w-5 text-earth-400 dark:text-earth-500 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </button>
          
          <button
            onClick={navigateToDailyVerse}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-md border border-earth-100 dark:border-earth-700 p-5 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-saffron-300 dark:hover:border-saffron-600 group relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-saffron-100/50 dark:bg-saffron-900/10 rounded-bl-full -mr-6 -mt-6 z-0"></div>
            <div className="flex items-center relative z-10">
              <div className="bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/30 rounded-full p-3 mr-4 shadow-sm">
                <SunMoon className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg text-earth-900 dark:text-earth-100">Daily Verse</span>
                <p className="text-sm text-earth-600 dark:text-earth-400">Today's wisdom</p>
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-full bg-earth-50 dark:bg-earth-700 flex items-center justify-center group-hover:bg-saffron-100 dark:group-hover:bg-saffron-800/50 transition-colors">
                <ChevronRight className="h-5 w-5 text-earth-400 dark:text-earth-500 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </button>
          
          <button
            onClick={navigateToMeditate}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-md border border-earth-100 dark:border-earth-700 p-5 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-saffron-300 dark:hover:border-saffron-600 group relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-saffron-100/50 dark:bg-saffron-900/10 rounded-bl-full -mr-6 -mt-6 z-0"></div>
            <div className="flex items-center relative z-10">
              <div className="bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/30 rounded-full p-3 mr-4 shadow-sm">
                <Timer className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg text-earth-900 dark:text-earth-100">Meditate</span>
                <p className="text-sm text-earth-600 dark:text-earth-400">Find peace within</p>
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-full bg-earth-50 dark:bg-earth-700 flex items-center justify-center group-hover:bg-saffron-100 dark:group-hover:bg-saffron-800/50 transition-colors">
                <ChevronRight className="h-5 w-5 text-earth-400 dark:text-earth-500 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </button>
        </div>
        
        {featuredVerse && (
          <div className={`transition-all duration-700 delay-300 mb-8 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-medium text-earth-900 dark:text-earth-100 flex items-center">
                <Quote className="mr-2 h-4 w-4 text-saffron-500 dark:text-saffron-400" />
                Featured Verse
              </h2>
              <button 
                onClick={() => navigate(`/daily-verse`)}
                className="text-xs text-saffron-600 dark:text-saffron-400 py-1 px-2 rounded-full border border-saffron-200 dark:border-saffron-800 hover:bg-saffron-50 dark:hover:bg-saffron-900/30 transition-colors"
              >
                See more
              </button>
            </div>
            
            <div className="bg-white dark:bg-earth-800 rounded-lg shadow-md border border-earth-100 dark:border-earth-700 p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 text-6xl font-serif text-saffron-600 dark:text-saffron-400 -mt-4 -mr-4">
                ॐ
              </div>
              <div className="relative z-10">
                <p className="text-earth-900 dark:text-earth-100 mb-3 font-sanskrit">{featuredVerse.sanskrit}</p>
                <p className="text-earth-700 dark:text-earth-300 text-sm">{featuredVerse.english}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs bg-earth-100 dark:bg-earth-700 text-earth-600 dark:text-earth-300 px-2 py-1 rounded-full">
                    Chapter {featuredVerse.chapter}, Verse {featuredVerse.verse}
                  </span>
                  <button 
                    onClick={() => navigate(`/chapters/${featuredVerse.chapter}/${featuredVerse.verse}`)}
                    className="text-saffron-600 dark:text-saffron-400 text-sm inline-flex items-center transition-all duration-300 hover:translate-x-1 font-medium"
                  >
                    Read more <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif font-medium text-earth-900 dark:text-earth-100 flex items-center">
              <Star className="mr-2 h-4 w-4 text-saffron-500 dark:text-saffron-400" />
              Popular Chapters
            </h2>
            <button 
              onClick={navigateToChapters}
              className="text-xs text-saffron-600 dark:text-saffron-400 py-1 px-2 rounded-full border border-saffron-200 dark:border-saffron-800 hover:bg-saffron-50 dark:hover:bg-saffron-900/30 transition-colors"
            >
              View all
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => navigate(`/chapters/${chapter.id}`)}
                className={`bg-white dark:bg-earth-800 rounded-lg p-4 flex items-center justify-between shadow-sm border border-earth-100 dark:border-earth-700 transition-all duration-300 hover:shadow-md hover:border-saffron-300 dark:hover:border-saffron-600 
                  ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ 
                  transitionDelay: `${400 + (index * 100)}ms`
                }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mr-3 text-sm font-medium text-saffron-600 dark:text-saffron-400">
                    {chapter.id}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-earth-900 dark:text-earth-100">{chapter.name}</h3>
                    <p className="text-xs text-earth-600 dark:text-earth-400">{chapter.verses} verses</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-earth-400 dark:text-earth-500" />
              </button>
            ))}
          </div>
        </div>
        
        <div className={`mt-8 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-earth-800 dark:to-earth-700 rounded-lg p-5 shadow-md relative overflow-hidden">
            <div className="absolute top-2 left-2 opacity-20">
              <Quote size={40} className="text-saffron-600 dark:text-saffron-400" />
            </div>
            <div className="relative z-10">
              <p className="italic text-earth-800 dark:text-earth-100 mb-3 font-medium">
                "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
              </p>
              <div className="flex justify-end">
                <p className="text-sm text-earth-700 dark:text-earth-300">- Bhagavad Gita, Chapter 2, Verse 47</p>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => navigate('/chapters/2/47')}
                  className="bg-white/80 dark:bg-earth-900/80 text-saffron-600 dark:text-saffron-400 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
                >
                  <Heart size={14} className="mr-1" /> 
                  Read full verse
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Replace the old "Made with Love" section with our new component */}
        <div className={`transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <MadeWithLove />
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
