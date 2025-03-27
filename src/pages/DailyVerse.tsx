
import { useEffect, useState } from 'react';
import { Share2, RefreshCw } from 'lucide-react';
import { getVerse } from '../data/verses';
import { Verse } from '../data/verses';
import MobileLayout from '../components/MobileLayout';
import { Progress } from "@/components/ui/progress";
import { getProgress, markVerseAsRead } from '../services/progressService';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const DailyVerse = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [todayDate, setTodayDate] = useState('');
  const [progress, setProgress] = useState(getProgress());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    
    // Simulate network loading delay
    setTimeout(() => {
      setVerse(randomDailyVerse);
      
      // Mark this verse as read in the progress
      if (randomDailyVerse) {
        markVerseAsRead(randomDailyVerse.chapter, randomDailyVerse.verse);
        setProgress(getProgress());
      }
      
      setIsLoaded(true);
      setIsLoading(false);
      setIsRefreshing(false);
    }, 1000);
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

  if (isLoading && !isRefreshing) {
    return (
      <MobileLayout currentRoute="/daily-verse">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 relative mb-4">
              <div className="absolute inset-0 rounded-full bg-saffron-100 animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full p-2 animate-spin" style={{ animationDuration: '3s' }}>
                <path fill="#E9B872" d="M256,56.4c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S297.4,56.4,256,56.4z M256,181.4c-27.6,0-50-22.4-50-50s22.4-50,50-50s50,22.4,50,50S283.6,181.4,256,181.4z"/>
              </svg>
            </div>
            <div className="animate-pulse text-saffron-600">Loading verse of the day...</div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout currentRoute="/daily-verse">
      <div className="pt-8 px-4">
        {/* Header with fade-in animation */}
        <div className={`text-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-2xl font-serif font-medium text-earth-900">Verse of the Day</h1>
          <p className="text-earth-600 mt-1">{todayDate}</p>
        </div>
        
        {/* Stats with delayed animation */}
        <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-earth-800 font-medium">Your Progress</span>
            <span className="text-sm text-saffron-600">{progress.completedVerses.size}/{progress.totalVerses} verses</span>
          </div>
          <Progress value={(progress.completedVerses.size / progress.totalVerses) * 100} className="h-2 bg-earth-100" />
          <div className="mt-2 text-sm text-earth-700">
            <span className="font-medium">{progress.readStreak} day streak!</span> Keep going!
          </div>
        </div>
        
        {/* Verse Card with gentle rise and shine animation */}
        {isRefreshing ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
            <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0 shadow-md' : 'opacity-0 translate-y-4'}`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium bg-saffron-100 text-saffron-800 rounded-full px-3 py-1 flex items-center justify-center">
                  Chapter {verse.chapter} · Verse {verse.verse}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={handleRefreshVerse}
                    disabled={isRefreshing}
                    className="text-earth-600 p-2 hover:text-saffron-600 transition-colors duration-300 bg-earth-50 rounded-full flex items-center justify-center"
                    aria-label="Refresh verse"
                  >
                    <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                  </button>
                  <button className="text-earth-600 p-2 hover:text-saffron-600 transition-colors duration-300 bg-earth-50 rounded-full flex items-center justify-center">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <h3 className="text-sm font-medium text-earth-700 mb-1">Sanskrit</h3>
                  <p className="text-lg font-sanskrit text-earth-900">{verse.sanskrit}</p>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-sm font-medium text-earth-700 mb-1">English</h3>
                  <p className="text-earth-800">{verse.english}</p>
                </div>
              </div>
            </div>
          )
        )}
        
        {/* Inspiration with soft glow animation */}
        <div className={`text-center italic text-earth-700 px-4 mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative py-8">
            <div className="absolute inset-0 bg-saffron-100 opacity-30 rounded-lg transform scale-95 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="relative">
              "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place."
            </div>
          </div>
        </div>

        {/* Visual element - decorative lotus */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full bg-saffron-100 animate-pulse" style={{ animationDuration: '3s' }}></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full p-2">
              <path fill="#E9B872" d="M256,56.4c-2.7,0-5.3,0.4-7.9,1c25.1,7,43.5,37.5,43.5,74.5c0,41.4-22.8,75-51,75s-51-33.6-51-75c0-37,18.4-67.5,43.5-74.5c-2.6-0.6-5.2-1-7.9-1c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S297.4,56.4,256,56.4z"/>
              <path fill="#E9B872" d="M256,56.4c41.4,0,75,33.6,75,75s-33.6,75-75,75s-75-33.6-75-75S214.6,56.4,256,56.4z M256,181.4c27.6,0,50-22.4,50-50s-22.4-50-50-50s-50,22.4-50,50S228.4,181.4,256,181.4z"/>
              <path fill="#E9B872" d="M256,56.4c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S297.4,56.4,256,56.4z M256,181.4c-27.6,0-50-22.4-50-50s22.4-50,50-50s50,22.4,50,50S283.6,181.4,256,181.4z"/>
            </svg>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DailyVerse;
