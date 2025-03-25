
import { Heart } from 'lucide-react';

const MadeWithLove = () => {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Softer background gradient for reduced eye strain */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-saffron-50/20 to-saffron-100/30 dark:from-transparent dark:via-saffron-900/5 dark:to-saffron-900/10 pointer-events-none"></div>
      
      {/* Floating particles with reduced opacity and slower animation */}
      <div className="absolute h-2 w-2 rounded-full bg-saffron-300/50 dark:bg-saffron-600/30 top-1/4 left-1/3 animate-float opacity-40" style={{animationDuration: '8s'}}></div>
      <div className="absolute h-1.5 w-1.5 rounded-full bg-saffron-400/50 dark:bg-saffron-500/30 bottom-1/3 right-1/3 animate-float opacity-30" style={{animationDuration: '6s'}}></div>
      <div className="absolute h-1 w-1 rounded-full bg-maroon-300/50 dark:bg-maroon-600/30 top-1/2 right-1/4 animate-float opacity-20" style={{animationDuration: '10s'}}></div>
      
      <div className="relative mx-auto max-w-xs">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Decorative line with reduced intensity */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-saffron-300/70 dark:via-saffron-600/40 to-transparent mb-6"></div>
          
          {/* Main content with softer glow */}
          <div className="relative inline-block">
            <div className="absolute -inset-px bg-gradient-to-r from-saffron-200/70 via-maroon-200/70 to-saffron-200/70 dark:from-saffron-800/20 dark:via-maroon-800/20 dark:to-saffron-800/20 rounded-full blur-md opacity-50 animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="relative bg-white/90 dark:bg-earth-800/90 rounded-full px-5 py-2.5 shadow-sm border border-saffron-100/80 dark:border-saffron-900/20">
              <span className="bg-gradient-to-r from-saffron-600/90 to-maroon-600/90 dark:from-saffron-400/90 dark:to-maroon-400/90 bg-clip-text text-transparent font-medium">
                Crafted with devotion
              </span>
            </div>
          </div>
          
          {/* Heart animation with gentler pulse */}
          <div className="my-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-saffron-200/60 to-maroon-200/60 dark:from-saffron-800/20 dark:to-maroon-800/20 rounded-full blur-lg opacity-40 scale-125 animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="bg-white/90 dark:bg-earth-800/90 rounded-full p-2.5 relative shadow-sm border border-saffron-100/80 dark:border-saffron-900/20">
              <Heart className="h-5 w-5 text-maroon-500/90 dark:text-maroon-400/90 fill-maroon-500/90 dark:fill-maroon-400/90" />
            </div>
          </div>
          
          {/* Description with increased line height for readability */}
          <p className="text-sm text-earth-600/90 dark:text-earth-400/90 max-w-[200px] leading-relaxed">
            For seekers of wisdom on their spiritual journey
          </p>
          
          {/* Sanskrit symbol with reduced opacity */}
          <div className="mt-5 text-saffron-500/20 dark:text-saffron-600/20 text-xl font-serif">
            ॐ शांति
          </div>
        </div>
      </div>
    </div>
  );
};

export default MadeWithLove;
