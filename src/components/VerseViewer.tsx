
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
  
  // Dummy image URL for verse representation
  const dummyImageUrl = `https://source.unsplash.com/random/800x600/?spirituality,india,meditation,${verse.chapter}`;
  
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
            className={`p-2 rounded-full transition-transform duration-200 ${
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
            className={`p-2 rounded-full transition-transform duration-200 ${
              verse.verse === totalVerses 
                ? 'text-earth-400 bg-earth-100 dark:text-earth-500 dark:bg-earth-900 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 dark:text-earth-200 dark:bg-earth-800 dark:hover:bg-earth-700 hover:scale-105'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Verse Image Representation */}
      <div className="mb-6 rounded-lg overflow-hidden shadow-md">
        <img 
          src={dummyImageUrl} 
          alt={`Visual representation of verse ${verse.verse} from chapter ${verse.chapter}`} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Audio Player */}
      {verse.audioUrl && (
        <div className={`mb-6 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <AudioPlayer audioUrl={verse.audioUrl} />
        </div>
      )}
      
      {/* Language Tabs using Shadcn UI */}
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sanskrit">Sanskrit</TabsTrigger>
            <TabsTrigger value="hindi">Hindi</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6 mt-4">
            <div className="verse-content animate-fade-in relative overflow-hidden">
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2">Sanskrit</h3>
              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-400 dark:bg-saffron-600 rounded-r-full transform -translate-y-1/2"></div>
                <p className="pl-1 font-sanskrit text-lg">{verse.sanskrit}</p>
              </div>
            </div>
            
            <div className="verse-content animate-fade-in relative overflow-hidden">
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2">Hindi</h3>
              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-300 dark:bg-saffron-700 rounded-r-full transform -translate-y-1/2"></div>
                <p className="pl-1 font-hindi text-lg">{verse.hindi}</p>
              </div>
            </div>
            
            <div className="verse-content animate-fade-in relative overflow-hidden">
              <h3 className="text-earth-800 dark:text-earth-100 font-medium mb-2">English</h3>
              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-200 dark:bg-saffron-800 rounded-r-full transform -translate-y-1/2"></div>
                <p className="pl-1 text-lg">{verse.english}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sanskrit" className="mt-4">
            <div className="verse-content relative overflow-hidden">
              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-400 dark:bg-saffron-600 rounded-r-full transform -translate-y-1/2"></div>
                <p className="pl-1 font-sanskrit text-xl">{verse.sanskrit}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hindi" className="mt-4">
            <div className="verse-content relative overflow-hidden">
              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-300 dark:bg-saffron-700 rounded-r-full transform -translate-y-1/2"></div>
                <p className="pl-1 font-hindi text-xl">{verse.hindi}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="english" className="mt-4">
            <div className="verse-content relative overflow-hidden">
              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-200 dark:bg-saffron-800 rounded-r-full transform -translate-y-1/2"></div>
                <p className="pl-1 text-xl">{verse.english}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Decorative element */}
      <div className="mt-8 flex justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-saffron-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default VerseViewer;
