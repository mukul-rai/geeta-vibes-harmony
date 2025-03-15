
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
    <div className="flex flex-col min-h-screen bg-earth-50 dark:bg-earth-900 dark:text-earth-50 max-w-md mx-auto relative overflow-hidden mandala-bg">
      {/* Decorative Om symbol in top right */}
      <div className="absolute top-4 right-4 om-symbol om-symbol-bg opacity-30" aria-hidden="true"></div>
      
      <main className={`flex-1 pb-20 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </main>
      
      <BottomNav currentRoute={currentRoute} />
    </div>
  );
};

export default MobileLayout;
