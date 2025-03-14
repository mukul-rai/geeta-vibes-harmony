
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { getVerse } from '../data/verses';
import { Verse } from '../data/verses';

const MEDITATION_TIMES = [
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
  { label: '20 min', seconds: 1200 }
];

const Meditate = () => {
  const [selectedTime, setSelectedTime] = useState(MEDITATION_TIMES[0]);
  const [timeRemaining, setTimeRemaining] = useState(selectedTime.seconds);
  const [isActive, setIsActive] = useState(false);
  const [inspirationalVerse, setInspirationalVerse] = useState<Verse | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = 
    ((selectedTime.seconds - timeRemaining) / selectedTime.seconds) * 100;

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(selectedTime.seconds);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Select a new meditation time
  const selectMeditationTime = (time: typeof MEDITATION_TIMES[0]) => {
    setSelectedTime(time);
    setTimeRemaining(time.seconds);
    resetTimer();
  };

  // Load an inspirational verse for meditation
  useEffect(() => {
    // Choose a random verse focused on meditation or peace
    const chapterOptions = [2, 6, 8]; // Chapters known for meditation teachings
    const randomChapter = chapterOptions[Math.floor(Math.random() * chapterOptions.length)];
    const randomVerse = Math.floor(Math.random() * 10) + 1; // Random verse 1-10
    
    const verse = getVerse(randomChapter, randomVerse);
    setInspirationalVerse(verse);
  }, []);

  // Handle timer logic
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            clearInterval(timerRef.current as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeRemaining]);

  return (
    <MobileLayout currentRoute="/meditate">
      <div className="pt-8 px-4 pb-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-serif font-medium text-earth-900">Meditation</h1>
          <p className="text-earth-600 mt-1">Find peace with the Gita's wisdom</p>
        </div>

        {/* Meditation Timer */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Timer Circle */}
              <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-earth-100" 
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                />
                <circle 
                  className="text-saffron-500 transition-all duration-1000 ease-in-out" 
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - progressPercentage / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              {/* Timer Display */}
              <div className="text-center z-10">
                <div className="text-4xl font-medium text-earth-900 mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-earth-600 text-sm">
                  {isActive ? 'Meditating...' : 'Ready to begin'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Timer Controls */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <button 
              onClick={toggleTimer}
              className="bg-saffron-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-saffron-700 transition-colors"
            >
              {isActive ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button 
              onClick={resetTimer}
              className="bg-earth-100 text-earth-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-earth-200 transition-colors"
            >
              <RefreshCw size={20} />
            </button>
          </div>
          
          {/* Time Selection */}
          <div className="flex justify-between gap-2">
            {MEDITATION_TIMES.map(time => (
              <button
                key={time.label}
                onClick={() => selectMeditationTime(time)}
                className={`flex-1 py-2 px-3 rounded-full text-sm font-medium transition-colors ${
                  selectedTime.label === time.label
                    ? 'bg-saffron-100 text-saffron-800'
                    : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Inspirational Verse */}
        {inspirationalVerse && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-serif font-medium text-earth-900 mb-2">
              Focus on this verse
            </h2>
            <p className="text-earth-600 mb-4 text-sm">
              Let the meaning sink deep into your consciousness
            </p>
            
            <div className="p-4 bg-earth-50 rounded-lg border border-earth-100">
              <p className="font-sanskrit text-earth-900 mb-3">{inspirationalVerse.sanskrit}</p>
              <p className="text-earth-700 text-sm">{inspirationalVerse.english}</p>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Meditate;
