
import { useState } from 'react';
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

  return (
    <div className="verse-card animate-fade-in">
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
            className={`p-2 rounded-full ${
              verse.verse === 1 
                ? 'text-earth-400 bg-earth-100 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNext}
            disabled={verse.verse === totalVerses}
            className={`p-2 rounded-full ${
              verse.verse === totalVerses 
                ? 'text-earth-400 bg-earth-100 cursor-not-allowed' 
                : 'text-earth-700 bg-earth-100 hover:bg-earth-200'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Audio Player */}
      {verse.audioUrl && (
        <div className="mb-6">
          <AudioPlayer audioUrl={verse.audioUrl} />
        </div>
      )}
      
      {/* Language Tabs */}
      <div className="flex border-b border-earth-200 mb-6">
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
      
      {/* Verse Content */}
      <div className="space-y-6">
        {(activeTab === 'all' || activeTab === 'sanskrit') && (
          <div className="verse-content animate-fade-in">
            <h3 className="text-earth-800 font-medium mb-2">Sanskrit</h3>
            <p className="sanskrit-text">{verse.sanskrit}</p>
          </div>
        )}
        
        {(activeTab === 'all' || activeTab === 'hindi') && (
          <div className="verse-content animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-earth-800 font-medium mb-2">Hindi</h3>
            <p className="hindi-text">{verse.hindi}</p>
          </div>
        )}
        
        {(activeTab === 'all' || activeTab === 'english') && (
          <div className="verse-content animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-earth-800 font-medium mb-2">English</h3>
            <p className="english-text">{verse.english}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerseViewer;
