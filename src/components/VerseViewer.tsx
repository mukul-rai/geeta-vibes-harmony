
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Verse } from '../data/verses';
import AudioPlayer from './AudioPlayer';

interface VerseViewerProps {
  verse: Verse;
  totalVerses: number;
  onNext: () => void;
  onPrevious: () => void;
}

const VerseViewer = ({ verse, totalVerses, onNext, onPrevious }: VerseViewerProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sanskrit' | 'hindi' | 'english'>('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
          <span className="text-xs font-medium bg-saffron-100 text-saffron-800 rounded-full px-3 py-1">
            Chapter {verse.chapter}
          </span>
          <h2 className="mt-2 text-xl md:text-2xl font-serif font-medium text-earth-900">
            Verse {verse.verse} of {totalVerses}
          </h2>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onPrevious}
            disabled={verse.verse === 1}
            className={`p-2 rounded-full transition-transform duration-200 ${
              verse.verse === 1 
                ? 'text-earth-400 bg-earth-100 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 hover:scale-105'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNext}
            disabled={verse.verse === totalVerses}
            className={`p-2 rounded-full transition-transform duration-200 ${
              verse.verse === totalVerses 
                ? 'text-earth-400 bg-earth-100 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200 hover:scale-105'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Audio Player */}
      {verse.audioUrl && (
        <div className={`mb-6 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <AudioPlayer audioUrl={verse.audioUrl} />
        </div>
      )}
      
      {/* Language Tabs */}
      <div className={`flex border-b border-earth-200 mb-6 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button 
          className={`tab-button ${activeTab === 'all' ? 'tab-button-active' : 'tab-button-inactive'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`tab-button ${activeTab === 'sanskrit' ? 'tab-button-active' : 'tab-button-inactive'}`}
          onClick={() => setActiveTab('sanskrit')}
        >
          Sanskrit
        </button>
        <button 
          className={`tab-button ${activeTab === 'hindi' ? 'tab-button-active' : 'tab-button-inactive'}`}
          onClick={() => setActiveTab('hindi')}
        >
          Hindi
        </button>
        <button 
          className={`tab-button ${activeTab === 'english' ? 'tab-button-active' : 'tab-button-inactive'}`}
          onClick={() => setActiveTab('english')}
        >
          English
        </button>
      </div>
      
      {/* Verse Content with animation effects */}
      <div className={`space-y-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {(activeTab === 'all' || activeTab === 'sanskrit') && (
          <div className="verse-content animate-fade-in relative overflow-hidden">
            <h3 className="text-earth-800 font-medium mb-2">Sanskrit</h3>
            <div className="relative">
              <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-300 rounded-r-full transform -translate-y-1/2"></div>
              <p className="sanskrit-text pl-1">{verse.sanskrit}</p>
            </div>
          </div>
        )}
        
        {(activeTab === 'all' || activeTab === 'hindi') && (
          <div className="verse-content animate-fade-in relative overflow-hidden" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-earth-800 font-medium mb-2">Hindi</h3>
            <div className="relative">
              <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-200 rounded-r-full transform -translate-y-1/2"></div>
              <p className="hindi-text pl-1">{verse.hindi}</p>
            </div>
          </div>
        )}
        
        {(activeTab === 'all' || activeTab === 'english') && (
          <div className="verse-content animate-fade-in relative overflow-hidden" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-earth-800 font-medium mb-2">English</h3>
            <div className="relative">
              <div className="absolute -left-4 top-1/2 w-2 h-8 bg-saffron-100 rounded-r-full transform -translate-y-1/2"></div>
              <p className="english-text pl-1">{verse.english}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative element */}
      <div className="mt-8 flex justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-saffron-300 to-transparent"></div>
      </div>
    </div>
  );
};

export default VerseViewer;
