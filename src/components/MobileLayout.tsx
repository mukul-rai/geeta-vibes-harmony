
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
    <div className="flex flex-col min-h-screen bg-backgroundCustom dark:bg-dark max-w-md mx-auto relative overflow-hidden mandala-bg spiritual-pattern">
      {/* Enhanced decorative header gradient */}
      <div className="fixed top-0 left-0 w-full h-72 bg-gradient-to-b from-saffron-100/30 via-saffron-50/20 to-transparent dark:from-saffron-900/10 dark:via-saffron-800/5 dark:to-transparent pointer-events-none z-0"></div>
      
      {/* Enhanced floating orbs with refined animations */}
      <div className="fixed top-1/4 left-10 w-20 h-20 rounded-full bg-saffron-300/5 dark:bg-saffron-700/5 blur-xl animate-gentle-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/3 right-8 w-24 h-24 rounded-full bg-saffron-200/5 dark:bg-saffron-800/5 blur-xl animate-gentle-float pointer-events-none"></div>
      <div className="fixed top-2/5 right-1/4 w-16 h-16 rounded-full bg-saffron-400/3 dark:bg-saffron-600/3 blur-lg animate-gentle-pulse pointer-events-none"></div>
      <div className="fixed top-3/5 left-1/5 w-12 h-12 rounded-full bg-maroon-300/3 dark:bg-maroon-600/3 blur-lg animate-gentle-float pointer-events-none delay-700"></div>
      
      {/* Content with smoother transitions */}
      <main className={`flex-1 pb-20 transition-all duration-500 ease-in-out relative z-10 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.99]'}`}>
        {children}
      </main>
      
      <BottomNav currentRoute={currentRoute} />
    </div>
  );
};

export default MobileLayout;
