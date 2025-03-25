
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Verse } from '../data/verses';
import AudioPlayer from './AudioPlayer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VerseViewerProps {
  verse: Verse;
  totalVerses: number;
  onNext: () => void;
  onPrevious: () => void;
}

const VerseViewer = ({ verse, totalVerses, onNext, onPrevious }: VerseViewerProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use the specific audio URL for all verses
  const audioUrl = "https://webaudioapi.com/samples/audio-tag/chrono.mp3";
  
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

  return (
    <div className={`verse-card transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-medium bg-saffron-100 text-saffron-800 dark:bg-saffron-900/50 dark:text-saffron-300 rounded-full px-3 py-1 inline-flex items-center justify-center">
            Chapter {verse.chapter}
          </span>
          <h2 className="mt-2 text-xl md:text-2xl font-serif font-medium text-earth-900 dark:text-earth-50 text-center">
            Verse {verse.verse} of {totalVerses}
          </h2>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onPrevious}
            disabled={verse.verse === 1}
            className={`p-2 rounded-full transition-transform duration-200 flex items-center justify-center ${
              verse.verse === 1 
                ? 'text-earth-400 bg-earth-100 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 dark:text-earth-200 dark:bg-earth-800 dark:hover:bg-earth-700 hover:scale-105'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNext}
            disabled={verse.verse === totalVerses}
            className={`p-2 rounded-full transition-transform duration-200 flex items-center justify-center ${
              verse.verse === totalVerses 
                ? 'text-earth-400 bg-earth-100 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 dark:text-earth-200 dark:bg-earth-800 dark:hover:bg-earth-700 hover:scale-105'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Verse Image Representation - Use the provided Krishna-Arjuna image */}
      <div className="mb-6 rounded-lg overflow-hidden shadow-md relative">
        <img 
          src="/lovable-uploads/0d9797fd-e449-48c4-a2ad-26da62f69a0e.png" 
          alt="Krishna teaching Arjuna on the battlefield of Kurukshetra"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 to-transparent dark:from-earth-950/70"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="inline-block px-2 py-1 bg-saffron-400/90 dark:bg-saffron-500/90 text-white text-xs rounded-full text-center flex items-center justify-center">
            Bhagavad Gita {verse.chapter}.{verse.verse}
          </div>
        </div>
      </div>
      
      {/* Audio Player - Use the provided audio URL */}
      <div className={`mb-6 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <AudioPlayer audioUrl={audioUrl} />
      </div>
      
      {/* Language Tabs using Shadcn UI */}
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4 bg-earth-100/80 dark:bg-earth-800/50 backdrop-blur-sm rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md flex items-center justify-center">All</TabsTrigger>
            <TabsTrigger value="sanskrit" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md flex items-center justify-center">Sanskrit</TabsTrigger>
            <TabsTrigger value="hindi" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md flex items-center justify-center">Hindi</TabsTrigger>
            <TabsTrigger value="english" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white dark:data-[state=active]:bg-saffron-600 rounded-md flex items-center justify-center">English</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4 animate-fade-in">
            <div className="verse-content relative overflow-hidden">
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-400 dark:bg-saffron-500 rounded-full mr-2 flex items-center justify-center"></span>
                Sanskrit
              </h3>
              <div className="pl-1 font-sanskrit text-lg bg-earth-50/50 dark:bg-earth-900/50 p-3 rounded-md border border-earth-200 dark:border-earth-800 text-center flex items-center justify-center">
                {verse.sanskrit}
              </div>
            </div>
            
            <div className="verse-content relative overflow-hidden">
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-300 dark:bg-saffron-600 rounded-full mr-2 flex items-center justify-center"></span>
                Hindi
              </h3>
              <div className="pl-1 font-hindi text-lg bg-earth-50/50 dark:bg-earth-900/50 p-3 rounded-md border border-earth-200 dark:border-earth-800 text-center flex items-center justify-center">
                {verse.hindi}
              </div>
            </div>
            
            <div className="verse-content relative overflow-hidden">
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-saffron-200 dark:bg-saffron-700 rounded-full mr-2 flex items-center justify-center"></span>
                English
              </h3>
              <div className="pl-1 text-lg bg-earth-50/50 dark:bg-earth-900/50 p-3 rounded-md border border-earth-200 dark:border-earth-800 text-center flex items-center justify-center">
                {verse.english}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sanskrit" className="mt-4 animate-fade-in">
            <div className="verse-content relative overflow-hidden">
              <div className="pl-1 font-sanskrit text-xl bg-earth-50/50 dark:bg-earth-900/50 p-4 rounded-md border border-earth-200 dark:border-earth-800 text-center flex items-center justify-center">
                {verse.sanskrit}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hindi" className="mt-4 animate-fade-in">
            <div className="verse-content relative overflow-hidden">
              <div className="pl-1 font-hindi text-xl bg-earth-50/50 dark:bg-earth-900/50 p-4 rounded-md border border-earth-200 dark:border-earth-800 text-center flex items-center justify-center">
                {verse.hindi}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="english" className="mt-4 animate-fade-in">
            <div className="verse-content relative overflow-hidden">
              <div className="pl-1 text-xl bg-earth-50/50 dark:bg-earth-900/50 p-4 rounded-md border border-earth-200 dark:border-earth-800 text-center flex items-center justify-center">
                {verse.english}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Decorative element */}
      <div className="mt-8 flex justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-saffron-400 to-transparent dark:via-saffron-600"></div>
      </div>
    </div>
  );
};

export default VerseViewer;
