
import { Home, BookOpen, SunMoon, Timer, User, TrendingUp } from 'lucide-react';
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
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: User, label: 'Profile', path: isAuthenticated ? '/profile' : '/login' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-earth-900/90 backdrop-blur-md border-t border-earth-100 dark:border-earth-800 z-50 shadow-md">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentRoute === item.path || 
            (item.path === '/chapters' && currentRoute.includes('/chapters/')) ||
            (item.path === '/profile' && (currentRoute === '/edit-profile' || currentRoute === '/notifications'));
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`relative flex flex-col items-center justify-center w-full h-full group`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-saffron-400 dark:bg-saffron-500 rounded-b-full" />
              )}
              
              <div className={`flex items-center justify-center w-8 h-8 mb-1 transition-all ${
                isActive 
                  ? 'bg-saffron-100 dark:bg-saffron-900/40 rounded-full shadow-sm'
                  : 'group-hover:bg-earth-100 dark:group-hover:bg-earth-800 rounded-full'
              }`}>
                <item.icon 
                  size={18} 
                  className={`transition-colors ${
                    isActive 
                      ? 'text-saffron-600 dark:text-saffron-400' 
                      : 'text-earth-500 dark:text-earth-300 group-hover:text-earth-700 dark:group-hover:text-earth-100'
                  }`}
                />
              </div>
              
              <span className={`text-xs transition-colors ${
                isActive 
                  ? 'font-medium text-saffron-600 dark:text-saffron-400' 
                  : 'text-earth-500 dark:text-earth-300 group-hover:text-earth-700 dark:group-hover:text-earth-100'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
