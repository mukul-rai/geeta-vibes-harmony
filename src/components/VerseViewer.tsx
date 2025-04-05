
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Share2 } from 'lucide-react';
import { Verse } from '../data/verses';
import AudioPlayer from './AudioPlayer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addBookmark, removeBookmark, isVerseBookmarked } from '../services/bookmarkService';
import { useToast } from '@/hooks/use-toast';

interface VerseViewerProps {
  verse: Verse;
  totalVerses: number;
  onNext: () => void;
  onPrevious: () => void;
}

const VerseViewer = ({ verse, totalVerses, onNext, onPrevious }: VerseViewerProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // Use the specific audio URL for all verses
  const audioUrl = "https://webaudioapi.com/samples/audio-tag/chrono.mp3";
  
  // Check if verse is bookmarked
  useEffect(() => {
    setBookmarked(isVerseBookmarked(verse.chapter, verse.verse));
  }, [verse]);
  
  // Set initial load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Handle verse change animation
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [verse]);

  const toggleBookmark = () => {
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

  return (
    <div className={`verse-card transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-medium bg-saffron-100 text-saffron-800 dark:bg-saffron-900/50 dark:text-saffron-300 rounded-full px-3 py-1">
            Chapter {verse.chapter}
          </span>
          <h2 className="mt-2 text-xl md:text-2xl font-serif font-medium text-earth-900 dark:text-earth-50">
            Verse {verse.verse} of {totalVerses}
          </h2>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onPrevious}
            disabled={verse.verse === 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              verse.verse === 1 
                ? 'text-earth-400 bg-earth-100 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 dark:text-earth-200 dark:bg-earth-800 dark:hover:bg-earth-700 hover:scale-105 hover:-translate-x-1'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNext}
            disabled={verse.verse === totalVerses}
            className={`p-2 rounded-full transition-all duration-300 ${
              verse.verse === totalVerses 
                ? 'text-earth-400 bg-earth-100 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 dark:text-earth-200 dark:bg-earth-800 dark:hover:bg-earth-700 hover:scale-105 hover:translate-x-1'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Verse Image Representation with improved animation */}
      <div className="mb-6 rounded-lg overflow-hidden shadow-md relative group">
        <img 
          src="/lovable-uploads/0d9797fd-e449-48c4-a2ad-26da62f69a0e.png" 
          alt="Krishna teaching Arjuna on the battlefield of Kurukshetra"
          className="w-full h-48 object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 to-transparent dark:from-earth-950/70"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="inline-block px-2 py-1 bg-saffron-400/90 dark:bg-saffron-500/90 text-white text-xs rounded-full">
            Bhagavad Gita {verse.chapter}.{verse.verse}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleBookmark} 
              className="p-2 bg-white/80 dark:bg-earth-900/80 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
            >
              {bookmarked ? (
                <BookmarkCheck size={16} className="text-saffron-600 dark:text-saffron-400" />
              ) : (
                <Bookmark size={16} className="text-earth-600 dark:text-earth-400" />
              )}
            </button>
            <button 
              onClick={shareVerse}
              className="p-2 bg-white/80 dark:bg-earth-900/80 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
            >
              <Share2 size={16} className="text-earth-600 dark:text-earth-400" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Audio Player - Use the provided audio URL */}
      <div className={`mb-6 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <AudioPlayer audioUrl={audioUrl} />
      </div>
      
      {/* Language Tabs using Shadcn UI with improved animations */}
      <div className="mb-6">
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4 mb-4 bg-earth-100/80 dark:bg-earth-800/50 backdrop-blur-sm rounded-lg">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md transition-all duration-300"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="sanskrit" 
              className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md transition-all duration-300"
            >
              Sanskrit
            </TabsTrigger>
            <TabsTrigger 
              value="hindi" 
              className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md transition-all duration-300"
            >
              Hindi
            </TabsTrigger>
            <TabsTrigger 
              value="english" 
              className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md transition-all duration-300"
            >
              English
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-400 dark:bg-saffron-500 rounded-full mr-2"></span>
                Sanskrit
              </h3>
              <div className="pl-1 font-sanskrit text-lg bg-earth-50/50 dark:bg-earth-900/50 p-3 rounded-md border border-earth-200 dark:border-earth-800 hover:border-saffron-300 dark:hover:border-saffron-600 transition-colors duration-300">
                {verse.sanskrit}
              </div>
            </div>
            
            <div className={`verse-content relative overflow-hidden transition-all duration-500 delay-100 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-300 dark:bg-saffron-600 rounded-full mr-2"></span>
                Hindi
              </h3>
              <div className="pl-1 font-hindi text-lg bg-earth-50/50 dark:bg-earth-900/50 p-3 rounded-md border border-earth-200 dark:border-earth-800 hover:border-saffron-300 dark:hover:border-saffron-600 transition-colors duration-300">
                {verse.hindi}
              </div>
            </div>
            
            <div className={`verse-content relative overflow-hidden transition-all duration-500 delay-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-200 dark:bg-saffron-700 rounded-full mr-2"></span>
                English
              </h3>
              <div className="pl-1 text-lg bg-earth-50/50 dark:bg-earth-900/50 p-3 rounded-md border border-earth-200 dark:border-earth-800 hover:border-saffron-300 dark:hover:border-saffron-600 transition-colors duration-300">
                {verse.english}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sanskrit" className="mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="pl-1 font-sanskrit text-xl bg-earth-50/50 dark:bg-earth-900/50 p-4 rounded-md border border-earth-200 dark:border-earth-800 hover:border-saffron-300 dark:hover:border-saffron-600 transition-colors duration-300">
                {verse.sanskrit}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hindi" className="mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="pl-1 font-hindi text-xl bg-earth-50/50 dark:bg-earth-900/50 p-4 rounded-md border border-earth-200 dark:border-earth-800 hover:border-saffron-300 dark:hover:border-saffron-600 transition-colors duration-300">
                {verse.hindi}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="english" className="mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="pl-1 text-xl bg-earth-50/50 dark:bg-earth-900/50 p-4 rounded-md border border-earth-200 dark:border-earth-800 hover:border-saffron-300 dark:hover:border-saffron-600 transition-colors duration-300">
                {verse.english}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Decorative element with enhanced animation */}
      <div className="mt-8 flex justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-saffron-400 to-transparent dark:via-saffron-600 animate-pulse" style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default VerseViewer;
