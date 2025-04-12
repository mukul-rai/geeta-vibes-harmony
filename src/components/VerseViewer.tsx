
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
        className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
      });
    } else {
      addBookmark(verse.chapter, verse.verse);
      setBookmarked(true);
      toast({
        title: "Bookmark Added",
        description: `Verse ${verse.chapter}:${verse.verse} has been added to your bookmarks.`,
        duration: 2000,
        className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
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
          className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
        });
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(verseText);
      toast({
        title: "Copied to Clipboard",
        description: "Verse text has been copied to your clipboard.",
        duration: 2000,
        className: "bg-saffron-50 border-saffron-200 text-earth-800 dark:bg-earth-800 dark:border-earth-700 dark:text-saffron-300"
      });
    }
  };

  return (
    <div className={`verse-card transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-medium bg-saffron-100/80 text-saffron-800 dark:bg-saffron-900/50 dark:text-saffron-300 rounded-full px-3 py-1 shadow-sm">
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
            className={`p-2.5 rounded-full transition-all duration-300 shadow-sm ${
              verse.verse === 1 
                ? 'text-earth-400 bg-earth-100/80 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100/80 hover:bg-earth-200/80 dark:text-earth-200 dark:bg-earth-800/80 dark:hover:bg-earth-700/80 hover:scale-105 hover:-translate-x-1 active:scale-95'
            }`}
            aria-label="Previous verse"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNext}
            disabled={verse.verse === totalVerses}
            className={`p-2.5 rounded-full transition-all duration-300 shadow-sm ${
              verse.verse === totalVerses 
                ? 'text-earth-400 bg-earth-100/80 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100/80 hover:bg-earth-200/80 dark:text-earth-200 dark:bg-earth-800/80 dark:hover:bg-earth-700/80 hover:scale-105 hover:translate-x-1 active:scale-95'
            }`}
            aria-label="Next verse"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Verse Image with enhanced design */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-md relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-saffron-500/10 to-transparent mix-blend-overlay opacity-60"></div>
        <img 
          src="/lovable-uploads/0d9797fd-e449-48c4-a2ad-26da62f69a0e.png" 
          alt="Krishna teaching Arjuna on the battlefield of Kurukshetra"
          className="w-full h-52 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105 filter saturate-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 to-transparent dark:from-earth-950/80"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="inline-block px-3 py-1.5 bg-saffron-400/90 dark:bg-saffron-500/90 text-white text-xs font-medium rounded-full shadow-sm">
            Bhagavad Gita {verse.chapter}.{verse.verse}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleBookmark} 
              className="p-2 bg-white/90 dark:bg-earth-900/90 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {bookmarked ? (
                <BookmarkCheck size={16} className="text-saffron-600 dark:text-saffron-400" />
              ) : (
                <Bookmark size={16} className="text-earth-600 dark:text-earth-400" />
              )}
            </button>
            <button 
              onClick={shareVerse}
              className="p-2 bg-white/90 dark:bg-earth-900/90 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Share verse"
            >
              <Share2 size={16} className="text-earth-600 dark:text-earth-400" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Audio Player with enhanced styling */}
      <div className={`mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <AudioPlayer audioUrl={audioUrl} />
      </div>
      
      {/* Language Tabs with enhanced styling */}
      <div className="mb-6">
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4 mb-5 bg-earth-100/70 dark:bg-earth-800/70 backdrop-blur-sm rounded-xl p-1">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-saffron-500/90 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600/90 rounded-lg transition-all duration-300 py-2.5 shadow-sm"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="sanskrit" 
              className="data-[state=active]:bg-saffron-500/90 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600/90 rounded-lg transition-all duration-300 py-2.5 shadow-sm"
            >
              Sanskrit
            </TabsTrigger>
            <TabsTrigger 
              value="hindi" 
              className="data-[state=active]:bg-saffron-500/90 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600/90 rounded-lg transition-all duration-300 py-2.5 shadow-sm"
            >
              Hindi
            </TabsTrigger>
            <TabsTrigger 
              value="english" 
              className="data-[state=active]:bg-saffron-500/90 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600/90 rounded-lg transition-all duration-300 py-2.5 shadow-sm"
            >
              English
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-5 mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2.5 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-400 dark:bg-saffron-500 rounded-full mr-2"></span>
                Sanskrit
              </h3>
              <div className="pl-1 font-sanskrit text-lg bg-earth-50/70 dark:bg-earth-900/70 p-4 rounded-xl border border-earth-200/70 dark:border-earth-800/70 hover:border-saffron-300/70 dark:hover:border-saffron-600/70 transition-colors duration-300 shadow-sm">
                {verse.sanskrit}
              </div>
            </div>
            
            <div className={`verse-content relative overflow-hidden transition-all duration-500 delay-100 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2.5 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-300 dark:bg-saffron-600 rounded-full mr-2"></span>
                Hindi
              </h3>
              <div className="pl-1 font-hindi text-lg bg-earth-50/70 dark:bg-earth-900/70 p-4 rounded-xl border border-earth-200/70 dark:border-earth-800/70 hover:border-saffron-300/70 dark:hover:border-saffron-600/70 transition-colors duration-300 shadow-sm">
                {verse.hindi}
              </div>
            </div>
            
            <div className={`verse-content relative overflow-hidden transition-all duration-500 delay-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2.5 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-200 dark:bg-saffron-700 rounded-full mr-2"></span>
                English
              </h3>
              <div className="pl-1 text-lg bg-earth-50/70 dark:bg-earth-900/70 p-4 rounded-xl border border-earth-200/70 dark:border-earth-800/70 hover:border-saffron-300/70 dark:hover:border-saffron-600/70 transition-colors duration-300 shadow-sm">
                {verse.english}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sanskrit" className="mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="pl-1 font-sanskrit text-xl bg-earth-50/70 dark:bg-earth-900/70 p-5 rounded-xl border border-earth-200/70 dark:border-earth-800/70 hover:border-saffron-300/70 dark:hover:border-saffron-600/70 transition-colors duration-300 shadow-sm">
                {verse.sanskrit}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hindi" className="mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="pl-1 font-hindi text-xl bg-earth-50/70 dark:bg-earth-900/70 p-5 rounded-xl border border-earth-200/70 dark:border-earth-800/70 hover:border-saffron-300/70 dark:hover:border-saffron-600/70 transition-colors duration-300 shadow-sm">
                {verse.hindi}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="english" className="mt-4 animate-fade-in">
            <div className={`verse-content relative overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div className="pl-1 text-xl bg-earth-50/70 dark:bg-earth-900/70 p-5 rounded-xl border border-earth-200/70 dark:border-earth-800/70 hover:border-saffron-300/70 dark:hover:border-saffron-600/70 transition-colors duration-300 shadow-sm">
                {verse.english}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Decorative element with enhanced animation */}
      <div className="mt-8 flex justify-center">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-saffron-400/80 to-transparent dark:via-saffron-600/80 animate-gentle-pulse" style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default VerseViewer;
