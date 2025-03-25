
import { Heart } from 'lucide-react';

const MadeWithLove = () => {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-saffron-50/30 to-saffron-100/40 dark:from-transparent dark:via-saffron-900/10 dark:to-saffron-900/20 pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute h-2 w-2 rounded-full bg-saffron-300 dark:bg-saffron-600 top-1/4 left-1/3 animate-float opacity-60" style={{animationDuration: '7s'}}></div>
      <div className="absolute h-1.5 w-1.5 rounded-full bg-saffron-400 dark:bg-saffron-500 bottom-1/3 right-1/3 animate-float opacity-50" style={{animationDuration: '5s'}}></div>
      <div className="absolute h-1 w-1 rounded-full bg-maroon-300 dark:bg-maroon-600 top-1/2 right-1/4 animate-float opacity-40" style={{animationDuration: '8s'}}></div>
      
      <div className="relative mx-auto max-w-xs">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Decorative line */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-saffron-300 dark:via-saffron-600 to-transparent mb-6"></div>
          
          {/* Main content */}
          <div className="relative inline-block">
            <div className="absolute -inset-px bg-gradient-to-r from-saffron-200 via-maroon-200 to-saffron-200 dark:from-saffron-800/40 dark:via-maroon-800/40 dark:to-saffron-800/40 rounded-full blur-md opacity-70 animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="relative bg-white dark:bg-earth-800 rounded-full px-5 py-2.5 shadow-md border border-saffron-100 dark:border-saffron-900/40">
              <span className="bg-gradient-to-r from-saffron-600 to-maroon-600 dark:from-saffron-400 dark:to-maroon-400 bg-clip-text text-transparent font-medium">
                Crafted with devotion
              </span>
            </div>
          </div>
          
          {/* Heart animation */}
          <div className="my-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-saffron-200 to-maroon-200 dark:from-saffron-800/30 dark:to-maroon-800/30 rounded-full blur-lg opacity-60 scale-125 animate-pulse" style={{animationDuration: '2s'}}></div>
            <div className="bg-white dark:bg-earth-800 rounded-full p-2.5 relative shadow-md border border-saffron-100 dark:border-saffron-900/40">
              <Heart className="h-5 w-5 text-maroon-500 dark:text-maroon-400 fill-maroon-500 dark:fill-maroon-400" />
            </div>
          </div>
          
          <p className="text-sm text-earth-600 dark:text-earth-400 max-w-[200px] leading-relaxed">
            For seekers of wisdom on their spiritual journey
          </p>
          
          {/* Sanskrit symbol */}
          <div className="mt-5 text-saffron-500/30 dark:text-saffron-600/30 text-xl font-serif">
            ॐ शांति
          </div>
        </div>
      </div>
    </div>
  );
};

export default MadeWithLove;
