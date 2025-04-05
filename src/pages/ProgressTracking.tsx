
import { useState, useEffect } from 'react';
import MobileLayout from '../components/MobileLayout';
import { getProgress } from '../services/progressService';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Award, BookOpen, TrendingUp, Calendar, Timer, BookmarkCheck } from 'lucide-react';
import { getBookmarks } from '../services/bookmarkService';
import BookmarkList from '../components/BookmarkList';

const ProgressTracking = () => {
  const [progress, setProgress] = useState(getProgress());
  const [chartData, setChartData] = useState<any[]>([]);
  const [chapterData, setChapterData] = useState<any[]>([]);
  const [animateValue, setAnimateValue] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const bookmarkCount = getBookmarks().length;
  
  // Generate reading history data for the chart
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

    // Generate chapter data
    const chapData = [];
    for (let i = 1; i <= 18; i++) {
      // For each chapter, count verses that start with "i:"
      const verseCount = Array.from(progress.completedVerses).filter(key => key.startsWith(`${i}:`)).length;
      chapData.push({
        chapter: i,
        completed: verseCount,
        total: i === 1 ? 47 : (i === 2 ? 72 : 40) // Approximation of verses per chapter
      });
    }
    setChapterData(chapData);
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
    <MobileLayout currentRoute="/progress">
      <div className="pt-6 px-4 pb-24">
        <div className="text-center mb-6 animate-fade-in">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-saffron-200 dark:bg-saffron-900/30 rounded-full animate-pulse"></div>
              <TrendingUp size={24} className="relative z-10 text-saffron-600 dark:text-saffron-400 m-2" />
            </div>
          </div>
          <h1 className="text-2xl font-serif font-medium text-earth-900 dark:text-earth-50 mb-3 relative inline-block">
            Reading Progress
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saffron-300 dark:via-saffron-700 to-transparent"></span>
          </h1>
          <p className="text-earth-700 dark:text-earth-200 text-sm max-w-xs mx-auto">
            Track your journey through the sacred wisdom of the Bhagavad Gita
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-earth-100 dark:bg-earth-800 rounded-xl p-1 mb-6">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-earth-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="statistics" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-earth-700">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-earth-700">
              Bookmarks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-earth-800 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center shadow-sm">
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
              
              <div className="bg-white dark:bg-earth-800 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center shadow-sm">
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
              
              <div className="bg-white dark:bg-earth-800 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center shadow-sm">
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
              
              <div className="bg-white dark:bg-earth-800 rounded-lg p-4 border border-earth-100 dark:border-earth-700 flex flex-col items-center shadow-sm">
                <div className="w-10 h-10 bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center mb-2">
                  <BookmarkCheck className="h-5 w-5 text-saffron-600 dark:text-saffron-400" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-earth-900 dark:text-earth-100">
                    {bookmarkCount}
                  </div>
                  <div className="text-xs text-earth-600 dark:text-earth-400">Bookmarks</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-white dark:bg-earth-800 rounded-lg p-5 border border-earth-100 dark:border-earth-700 shadow-sm">
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
              
              <div className="flex justify-between mt-1 text-xs text-earth-500 dark:text-earth-400">
                <span>Start</span>
                <span>Chapter 18</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-earth-800 rounded-lg p-5 border border-earth-100 dark:border-earth-700 shadow-sm">
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
          </TabsContent>
          
          <TabsContent value="statistics" className="animate-fade-in">
            <div className="bg-white dark:bg-earth-800 rounded-lg p-5 border border-earth-100 dark:border-earth-700 mb-6 shadow-sm">
              <h3 className="text-sm font-medium text-earth-800 dark:text-earth-200 mb-4">Chapter Completion</h3>
              <div className="h-64 bg-earth-50/50 dark:bg-earth-900/50 rounded-lg p-2 border border-earth-100 dark:border-earth-700">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chapterData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <XAxis 
                      dataKey="chapter" 
                      tick={{ fontSize: 10, fill: 'var(--earth-600)' }}
                      label={{ value: 'Chapter', position: 'insideBottom', offset: -5, fontSize: 10 }}
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
                      formatter={(value, name) => {
                        if (name === 'completed') return [`${value} verses`, 'Completed'];
                        return [`${value} verses`, 'Total'];
                      }}
                    />
                    <Bar 
                      dataKey="completed" 
                      stackId="a" 
                      fill="#E9B872" 
                      animationDuration={1200}
                    />
                    <Bar 
                      dataKey="total" 
                      stackId="a" 
                      fill="#E2E2E0" 
                      animationDuration={1200}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-earth-800 rounded-lg p-5 border border-earth-100 dark:border-earth-700 mb-6 shadow-sm">
              <h3 className="text-sm font-medium text-earth-800 dark:text-earth-200 mb-3">Time Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-earth-100 dark:border-earth-700 rounded-lg p-4 bg-earth-50/50 dark:bg-earth-900/50">
                  <div className="flex items-center justify-center mb-2">
                    <Timer className="h-4 w-4 text-saffron-500 dark:text-saffron-400 mr-1" />
                    <span className="text-xs text-earth-600 dark:text-earth-400 font-medium">Average Per Day</span>
                  </div>
                  <div className="text-center text-lg font-medium text-earth-900 dark:text-earth-100">
                    {Math.round(progress.completedVerses.size / (progress.readStreak || 1))} verses
                  </div>
                </div>
                
                <div className="border border-earth-100 dark:border-earth-700 rounded-lg p-4 bg-earth-50/50 dark:bg-earth-900/50">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-saffron-500 dark:text-saffron-400 mr-1" />
                    <span className="text-xs text-earth-600 dark:text-earth-400 font-medium">Estimated Completion</span>
                  </div>
                  <div className="text-center text-lg font-medium text-earth-900 dark:text-earth-100">
                    {Math.ceil((progress.totalVerses - progress.completedVerses.size) / (progress.completedVerses.size / (progress.readStreak || 1)))} days
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarks" className="animate-fade-in">
            <BookmarkList onClose={() => {}} />
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default ProgressTracking;
