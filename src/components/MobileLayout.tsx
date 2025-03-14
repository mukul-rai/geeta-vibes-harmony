
import { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface MobileLayoutProps {
  children: ReactNode;
  currentRoute: string;
}

const MobileLayout = ({ children, currentRoute }: MobileLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-earth-50 max-w-md mx-auto relative">
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav currentRoute={currentRoute} />
    </div>
  );
};

export default MobileLayout;
