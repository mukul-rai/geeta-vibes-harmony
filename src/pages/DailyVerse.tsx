
import { useEffect, useState } from 'react';
import { Share2, RefreshCw, Bookmark, BookmarkCheck, BarChart2 } from 'lucide-react';
import { getVerse } from '../data/verses';
import { Verse } from '../data/verses';
import MobileLayout from '../components/MobileLayout';
import { Progress } from "@/components/ui/progress";
import { getProgress, markVerseAsRead } from '../services/progressService';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { isVerseBookmarked, addBookmark, removeBookmark } from '../services/bookmarkService';
import ReadingStats from '../components/ReadingStats';

const DailyVerse = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [todayDate, setTodayDate] = useState('');
  const [progress, setProgress] = useState(getProgress());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get today's date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Fetch a random verse
    fetchRandomVerse();
    
    setTodayDate(dateStr);
    setProgress(getProgress());
  }, []);
  
  // Update bookmark status when verse changes
  useEffect(() => {
    if (verse) {
      setBookmarked(isVerseBookmarked(verse.chapter, verse.verse));
    }
  }, [verse]);

  const fetchRandomVerse = () => {
    setIsLoading(true);
    setIsLoaded(false);
    
    // Generate a random chapter (1-18)
    const randomChapter = Math.floor(Math.random() * 18) + 1;
    
    // Generate a random verse (1-10 for simplicity)
    // In a real app, we would get the actual number of verses per chapter
    const randomVerse = Math.floor(Math.random() * 10) + 1;
    
    // Get the random verse
    const randomDailyVerse = getVerse(randomChapter, randomVerse);
    
    // Simulate network loading delay with variable timing for more natural feel
    const loadTime = 800 + Math.random() * 400;
    setTimeout(() => {
      setVerse(randomDailyVerse);
      
      // Mark this verse as read in the progress
      if (randomDailyVerse) {
        markVerseAsRead(randomDailyVerse.chapter, randomDailyVerse.verse);
        setProgress(getProgress());
        setBookmarked(isVerseBookmarked(randomDailyVerse.chapter, randomDailyVerse.verse));
      }
      
      setIsLoaded(true);
      setIsLoading(false);
      setIsRefreshing(false);
    }, loadTime);
  };

  const handleRefreshVerse = () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    toast({
      title: "Refreshing verse",
      description: "Finding a new daily verse for you...",
      duration: 1500,
    });
    
    fetchRandomVerse();
  };
  
  const toggleBookmark = () => {
    if (!verse) return;
    
    if (bookmarked) {
      removeBookmark(verse.chapter, verse.verse);
      setBookmarked(false);
      toast({
        title: "Bookmark Removed",
        description: `Verse ${verse.chapter}:${verse.verse} has been removed from your bookmarks.`,
        duration: 2000,
      });
    } else {
      addBookmark(verse.chapter, verse.verse);
      setBookmarked(true);
      toast({
        title: "Bookmark Added",
        description: `Verse ${verse.chapter}:${verse.verse} has been added to your bookmarks.`,
        duration: 2000,
      });
    }
  };
  
  const shareVerse = () => {
    if (!verse) return;
    
    const verseText = `${verse.sanskrit}\n\n${verse.english}\n\n- Bhagavad Gita, Chapter ${verse.chapter}, Verse ${verse.verse}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita ${verse.chapter}:${verse.verse}`,
        text: verseText,
      })
      .catch(() => {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(verseText);
        toast({
          title: "Copied to Clipboard",
          description: "Verse text has been copied to your clipboard.",
          duration: 2000,
        });
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(verseText);
      toast({
        title: "Copied to Clipboard",
        description: "Verse text has been copied to your clipboard.",
        duration: 2000,
      });
    }
  };

  if (isLoading && !isRefreshing) {
    return (
      <MobileLayout currentRoute="/daily-verse">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <p className="text-earth-700 text-lg">Loading verse of the day...</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout currentRoute="/daily-verse">
      <div className="pt-8 px-4 pb-8">
        {/* Header with enhanced fade-in animation */}
        <div className={`text-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-2xl font-serif font-medium text-earth-900 dark:text-earth-100">Verse of the Day</h1>
          <p className="text-earth-600 dark:text-earth-400 mt-1">{todayDate}</p>
        </div>
        
        {/* Stats with interactive toggle */}
        <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-sm p-4 mb-6 transition-all duration-700 delay-100 hover:shadow-md ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-earth-800 dark:text-earth-200 font-medium">Your Progress</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-900/30 px-2 py-1 rounded-full">
                {progress.completedVerses.size}/{progress.totalVerses} verses
              </span>
              <button 
                onClick={() => setShowStats(!showStats)}
                className="p-1.5 bg-earth-100 dark:bg-earth-700 hover:bg-saffron-100 dark:hover:bg-saffron-900/30 rounded-full transition-colors"
              >
                <BarChart2 size={16} className="text-earth-600 dark:text-earth-300" />
              </button>
            </div>
          </div>
          <Progress 
            value={(progress.completedVerses.size / progress.totalVerses) * 100} 
            className="h-2.5 bg-earth-100 dark:bg-earth-700" 
          />
          <div className="mt-2 text-sm text-earth-700 dark:text-earth-300">
            <span className="font-medium">{progress.readStreak} day streak!</span> Keep going!
          </div>
          
          {/* Detailed stats panel that slides down when toggled */}
          {showStats && (
            <div className="mt-4 pt-4 border-t border-earth-100 dark:border-earth-700">
              <ReadingStats onClose={() => setShowStats(false)} />
            </div>
          )}
        </div>
        
        {/* Verse Card with enhanced animations */}
        {isRefreshing ? (
          <div className="bg-white dark:bg-earth-800 rounded-lg shadow-sm p-6 mb-6 animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>
              
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        ) : (
          verse && (
            <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-sm p-6 mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0 shadow-md' : 'opacity-0 translate-y-4'} hover:shadow-lg`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium bg-saffron-100 dark:bg-saffron-900/30 text-saffron-800 dark:text-saffron-300 rounded-full px-3 py-1 flex items-center justify-center">
                  Chapter {verse.chapter} · Verse {verse.verse}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleBookmark}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      bookmarked 
                        ? 'text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-900/30 hover:scale-110' 
                        : 'text-earth-600 dark:text-earth-400 bg-earth-50 dark:bg-earth-800 hover:bg-saffron-50 dark:hover:bg-saffron-900/30 hover:scale-110'
                    }`}
                    aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                  <button 
                    onClick={handleRefreshVerse}
                    disabled={isRefreshing}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isRefreshing
                        ? 'text-earth-400 dark:text-earth-600 bg-earth-50 dark:bg-earth-800 cursor-not-allowed'
                        : 'text-earth-600 dark:text-earth-400 bg-earth-50 dark:bg-earth-800 hover:bg-saffron-50 dark:hover:bg-saffron-900/30 hover:text-saffron-600 dark:hover:text-saffron-400 hover:scale-110'
                    }`}
                    aria-label="Refresh verse"
                  >
                    <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                  </button>
                  <button 
                    onClick={shareVerse}
                    className="text-earth-600 dark:text-earth-400 p-2 hover:text-saffron-600 dark:hover:text-saffron-400 transition-all duration-300 bg-earth-50 dark:bg-earth-800 hover:bg-saffron-50 dark:hover:bg-saffron-900/30 rounded-full hover:scale-110"
                    aria-label="Share verse"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <h3 className="text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">Sanskrit</h3>
                  <p className="text-lg font-sanskrit text-earth-900 dark:text-earth-100 bg-earth-50/70 dark:bg-earth-900/50 p-3 rounded-md border border-earth-100 dark:border-earth-800">
                    {verse.sanskrit}
                  </p>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">English</h3>
                  <p className="text-earth-800 dark:text-earth-200 bg-earth-50/70 dark:bg-earth-900/50 p-3 rounded-md border border-earth-100 dark:border-earth-800">
                    {verse.english}
                  </p>
                </div>
                
                {/* Interactive element - tap to see meaning */}
                <div className="mt-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <details className="group">
                    <summary className="text-sm text-saffron-600 dark:text-saffron-400 flex items-center cursor-pointer">
                      <span className="mr-2 text-xs transition-transform duration-300 group-open:rotate-90">▶</span>
                      <span>View deeper meaning</span>
                    </summary>
                    <div className="mt-2 p-3 bg-earth-50 dark:bg-earth-900/70 border border-dashed border-earth-200 dark:border-earth-700 rounded-md animate-fade-in">
                      <p className="text-earth-700 dark:text-earth-300 text-sm">
                        This verse emphasizes the importance of {verse.chapter === 2 ? 'detachment from the fruits of our actions' : 'connecting with our inner divinity'}. 
                        It reminds us that we are eternal beings on a spiritual journey, and that our actions in this world should be performed with awareness and devotion.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )
        )}
        
        {/* Inspiration with enhanced soft glow animation */}
        <div className={`text-center italic text-earth-700 dark:text-earth-300 px-4 mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative py-8 group hover:scale-105 transition-transform duration-500 cursor-pointer">
            <div className="absolute inset-0 bg-saffron-100 dark:bg-saffron-900/20 opacity-30 rounded-lg transform scale-95 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
            <div className="relative">
              "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place."
            </div>
          </div>
        </div>

        {/* Visual element - decorative lotus with enhanced animation */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="w-24 h-24 relative group cursor-pointer hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 rounded-full bg-saffron-100 dark:bg-saffron-900/30 animate-pulse" style={{ animationDuration: '3s' }}></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full p-2 group-hover:rotate-45 transition-transform duration-1000">
              <path fill="#E9B872" d="M256,56.4c-2.7,0-5.3,0.4-7.9,1c25.1,7,43.5,37.5,43.5,74.5c0,41.4-22.8,75-51,75s-51-33.6-51-75c0-37,18.4-67.5,43.5-74.5c-2.6-0.6-5.2-1-7.9-1c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S297.4,56.4,256,56.4z"/>
              <path fill="#E9B872" d="M256,56.4c41.4,0,75,33.6,75,75s-33.6,75-75,75s-75-33.6-75-75S214.6,56.4,256,56.4z M256,181.4c27.6,0,50-22.4,50-50s-22.4-50-50-50s-50,22.4-50,50S228.4,181.4,256,181.4z"/>
              <path fill="#E9B872" d="M256,56.4c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S297.4,56.4,256,56.4z M256,181.4c-27.6,0-50-22.4-50-50s22.4-50,50-50s50,22.4,50,50S283.6,181.4,256,181.4z"/>
            </svg>
          </div>
        </div>
        
        {/* New feature: Add an interactive quote carousel */}
        <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center mb-4">
            <span className="inline-block h-px w-8 bg-saffron-400 dark:bg-saffron-500"></span>
            <h3 className="text-lg font-serif font-medium text-earth-900 dark:text-earth-100 mx-2 inline-block">Daily Wisdom</h3>
            <span className="inline-block h-px w-8 bg-saffron-400 dark:bg-saffron-500"></span>
          </div>
          
          <div className="bg-white dark:bg-earth-800 rounded-lg shadow-md p-6 border-l-4 border-saffron-500 dark:border-saffron-600 hover:shadow-lg transition-shadow duration-300">
            <p className="text-earth-800 dark:text-earth-200 mb-4">
              "The mind acts like an enemy for those who don't control it, and like a best friend for those who do."
            </p>
            <p className="text-right text-sm text-saffron-600 dark:text-saffron-400">
              — Bhagavad Gita, Chapter 6, Verse 6
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DailyVerse;
