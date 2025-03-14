
import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { getVerse } from '../data/verses';
import { Verse } from '../data/verses';
import MobileLayout from '../components/MobileLayout';
import { Progress } from "@/components/ui/progress";
import { getProgress } from '../services/progressService';

const DailyVerse = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [todayDate, setTodayDate] = useState('');
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Generate a daily verse based on the date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Use the day of the year to select a verse (cycling through verses)
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime(); // Get timestamp from today
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Assuming we have 18 chapters with various verses
    // This is a simple algorithm to cycle through all verses
    const chapterIndex = (dayOfYear % 18) + 1; // 1-18
    const verseIndex = ((dayOfYear % 10) + 1); // 1-10 (simplified)
    
    const dailyVerse = getVerse(chapterIndex, verseIndex);
    
    setVerse(dailyVerse);
    setTodayDate(dateStr);
    setProgress(getProgress());
  }, []);

  if (!verse) {
    return (
      <MobileLayout currentRoute="/daily-verse">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-saffron-600">Loading verse of the day...</div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout currentRoute="/daily-verse">
      <div className="pt-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-medium text-earth-900">Verse of the Day</h1>
          <p className="text-earth-600 mt-1">{todayDate}</p>
        </div>
        
        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-earth-800 font-medium">Your Progress</span>
            <span className="text-sm text-saffron-600">{progress.completedVerses.size}/{progress.totalVerses} verses</span>
          </div>
          <Progress value={(progress.completedVerses.size / progress.totalVerses) * 100} className="h-2 bg-earth-100" />
          <div className="mt-2 text-sm text-earth-700">
            <span className="font-medium">{progress.readStreak} day streak!</span> Keep going!
          </div>
        </div>
        
        {/* Verse Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-medium bg-saffron-100 text-saffron-800 rounded-full px-3 py-1">
              Chapter {verse.chapter} · Verse {verse.verse}
            </span>
            <button className="text-earth-600 p-2 hover:text-saffron-600">
              <Share2 size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-earth-700 mb-1">Sanskrit</h3>
              <p className="text-lg font-sanskrit text-earth-900">{verse.sanskrit}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-earth-700 mb-1">English</h3>
              <p className="text-earth-800">{verse.english}</p>
            </div>
          </div>
        </div>
        
        {/* Inspiration */}
        <div className="text-center italic text-earth-700 px-4 mb-6">
          "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place."
        </div>
      </div>
    </MobileLayout>
  );
};

export default DailyVerse;
