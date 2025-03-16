
import { Home, BookOpen, SunMoon, Timer, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface BottomNavProps {
  currentRoute: string;
}

const BottomNav = ({ currentRoute }: BottomNavProps) => {
  const { isAuthenticated } = useAuth();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Chapters', path: '/chapters' },
    { icon: SunMoon, label: 'Verse', path: '/daily-verse' },
    { icon: Timer, label: 'Meditate', path: '/meditate' },
    { icon: User, label: 'Profile', path: isAuthenticated ? '/profile' : '/login' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-dark-card border-t border-borderCustom-light dark:border-dark-border shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentRoute === item.path || 
            (item.path === '/chapters' && currentRoute.includes('/chapters/')) ||
            (item.path === '/profile' && (currentRoute === '/edit-profile' || currentRoute === '/notifications'));
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive 
                  ? 'text-primary-500 dark:text-primary-400' 
                  : 'text-text-secondary dark:text-darkText-secondary'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
