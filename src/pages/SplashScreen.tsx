
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-earth-50 dark:bg-earth-900 animate-fade-in">
      <div className="text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <BookOpen className="w-20 h-20 text-saffron-500 animate-pulse" />
            <div className="absolute inset-0 bg-saffron-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          </div>
          
          <h1 className="font-serif text-4xl font-medium text-earth-900 dark:text-earth-50 mb-2 animate-fade-up">
            श्रीमद्‍भगवद्‍गीता
          </h1>
          <p className="text-earth-600 dark:text-earth-200 text-lg animate-fade-up" style={{ animationDelay: '200ms' }}>
            Divine Wisdom for Daily Life
          </p>
        </div>
        
        {/* Lotus flower SVG as loading indicator */}
        <div className="flex justify-center mt-8">
          <svg width="60" height="60" viewBox="0 0 100 100" className="animate-spin-slow">
            <path d="M50,15 C60,25 70,35 50,50 C30,35 40,25 50,15 Z" fill="#F59E0B" opacity="0.7" />
            <path d="M30,25 C40,35 50,45 50,50 C50,45 60,35 70,25 C80,40 70,50 50,50 C30,50 20,40 30,25 Z" fill="#F59E0B" opacity="0.8" />
            <path d="M20,40 C30,50 40,60 50,50 C60,60 70,50 80,40 C85,55 70,65 50,65 C30,65 15,55 20,40 Z" fill="#F59E0B" opacity="0.9" />
            <path d="M15,60 C25,70 40,75 50,65 C60,75 75,70 85,60 C85,75 70,85 50,85 C30,85 15,75 15,60 Z" fill="#F59E0B" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
