
import { useState, useEffect } from 'react';
import { getProgress } from '../services/progressService';
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Calendar, BookOpen, TrendingUp, Clock } from 'lucide-react';

interface ReadingStatProps {
  className?: string;
  onClose?: () => void;
}

const ReadingStats = ({ className = "", onClose }: ReadingStatProps) => {
  const [progress, setProgress] = useState(getProgress());
  const [chartData, setChartData] = useState<any[]>([]);
  const [animateValue, setAnimateValue] = useState(0);
  
  // Generate fake reading history data for the chart
  useEffect(() => {
    const fakeData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Generate some variety in the data
      let readCount;
      if (i === 0) {
        // Today's value matches actual completion
        readCount = progress.completedVerses.size;
      } else {
        // Previous days get simulated values
        const baseCount = Math.floor(progress.completedVerses.size * 0.85);
        readCount = baseCount - Math.floor(Math.random() * 10) + (6 - i) * 2;
        readCount = Math.max(0, readCount); // Ensure no negative values
      }
      
      fakeData.push({
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        verses: readCount
      });
    }
    
    setChartData(fakeData);
  }, [progress]);
  
  // Animate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateValue((prev) => {
        const next = prev + 1;
        if (next >= (progress.completedVerses.size / progress.totalVerses) * 100) {
          clearInterval(interval);
          return (progress.completedVerses.size / progress.totalVerses) * 100;
        }
        return next;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [progress]);
  
  return (
    <div className={`bg-white dark:bg-earth-800 rounded-lg shadow-md p-5 ${className} animate-fade-in`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-earth-900 dark:text-earth-100">Your Reading Journey</h2>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
          >
            Close
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-earth-50/70 dark:bg-earth-900/50 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center">
          <div className="w-10 h-10 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mb-2">
            <BookOpen className="h-5 w-5 text-saffron-600 dark:text-saffron-400" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-earth-900 dark:text-earth-100">
              {progress.completedVerses.size}
            </div>
            <div className="text-xs text-earth-600 dark:text-earth-400">Verses Read</div>
          </div>
        </div>
        
        <div className="bg-earth-50/70 dark:bg-earth-900/50 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center">
          <div className="w-10 h-10 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mb-2">
            <Calendar className="h-5 w-5 text-saffron-600 dark:text-saffron-400" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-earth-900 dark:text-earth-100">
              {progress.readStreak}
            </div>
            <div className="text-xs text-earth-600 dark:text-earth-400">Day Streak</div>
          </div>
        </div>
        
        <div className="bg-earth-50/70 dark:bg-earth-900/50 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center">
          <div className="w-10 h-10 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mb-2">
            <Award className="h-5 w-5 text-saffron-600 dark:text-saffron-400" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-earth-900 dark:text-earth-100">
              {Math.round((progress.completedVerses.size / progress.totalVerses) * 100)}%
            </div>
            <div className="text-xs text-earth-600 dark:text-earth-400">Completed</div>
          </div>
        </div>
        
        <div className="bg-earth-50/70 dark:bg-earth-900/50 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center">
          <div className="w-10 h-10 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-saffron-600 dark:text-saffron-400" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-earth-900 dark:text-earth-100">
              {progress.totalVerses - progress.completedVerses.size}
            </div>
            <div className="text-xs text-earth-600 dark:text-earth-400">Remaining</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-earth-700 dark:text-earth-300 font-medium">Total Progress</span>
          <span className="text-sm text-saffron-600 dark:text-saffron-400">
            {Math.round(animateValue)}%
          </span>
        </div>
        <Progress 
          value={animateValue} 
          className="h-3 bg-earth-100 dark:bg-earth-700" 
        />
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-earth-800 dark:text-earth-200 mb-3">Reading History</h3>
        <div className="h-48 bg-earth-50/50 dark:bg-earth-900/50 rounded-lg p-2 border border-earth-100 dark:border-earth-700">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10, fill: 'var(--earth-600)' }}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: 'var(--earth-600)' }}
                width={25}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--earth-50)',
                  borderColor: 'var(--earth-200)',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="verses" 
                stroke="#E9B872" 
                strokeWidth={2} 
                dot={{ fill: '#E9B872', strokeWidth: 0, r: 3 }}
                activeDot={{ fill: '#E9B872', stroke: '#FFFFFF', strokeWidth: 2, r: 5 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="text-xs text-earth-500 dark:text-earth-400 text-center">
        Keep reading daily to maintain your streak!
      </div>
    </div>
  );
};

export default ReadingStats;
