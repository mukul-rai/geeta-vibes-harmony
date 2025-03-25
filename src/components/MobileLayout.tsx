
import { ReactNode, useState, useEffect } from 'react';
import BottomNav from './BottomNav';
import { useTheme } from '@/context/ThemeContext';

interface MobileLayoutProps {
  children: ReactNode;
  currentRoute: string;
}

const MobileLayout = ({ children, currentRoute }: MobileLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Add slight delay for page transition effect
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentRoute]);

  return (
    <div className="flex flex-col min-h-screen bg-earth-50 dark:bg-earth-900 max-w-md mx-auto relative overflow-hidden mandala-bg">
      {/* More subtle decorative elements */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-saffron-100/20 to-transparent dark:from-saffron-900/5 dark:to-transparent pointer-events-none z-0"></div>
      
      {/* Enhanced subtle floating circles with reduced opacity and slower animations */}
      <div className="fixed top-1/4 left-10 w-16 h-16 rounded-full bg-saffron-200/10 dark:bg-saffron-700/3 blur-xl animate-pulse pointer-events-none" style={{ animationDuration: '10s' }}></div>
      <div className="fixed bottom-1/3 right-10 w-20 h-20 rounded-full bg-saffron-100/10 dark:bg-saffron-800/3 blur-xl animate-pulse pointer-events-none" style={{ animationDuration: '15s' }}></div>
      <div className="fixed top-1/2 right-1/4 w-12 h-12 rounded-full bg-saffron-300/5 dark:bg-saffron-600/3 blur-lg animate-pulse pointer-events-none" style={{ animationDuration: '12s' }}></div>
      
      <main className={`flex-1 pb-20 transition-opacity duration-300 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </main>
      
      <BottomNav currentRoute={currentRoute} />
    </div>
  );
};

export default MobileLayout;
