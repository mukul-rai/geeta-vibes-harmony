
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote, Heart } from 'lucide-react';
import chapters from '../data/chapters';
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

const FeaturedChaptersCarousel = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  
  // Select a few featured chapters with interesting content
  const featuredChapters = [
    {
      ...chapters.find(c => c.id === 2),
      quote: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
      verseRef: "2:47"
    },
    {
      ...chapters.find(c => c.id === 11),
      quote: "I am time, the destroyer of all; I have come to consume the world.",
      verseRef: "11:32"
    },
    {
      ...chapters.find(c => c.id === 9),
      quote: "I am the father of this universe, the mother, the support, and the grandsire.",
      verseRef: "9:17"
    },
    {
      ...chapters.find(c => c.id === 6),
      quote: "For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind will remain the greatest enemy.",
      verseRef: "6:6"
    }
  ];

  // Autoplay functionality
  const autoPlay = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    const interval = setInterval(autoPlay, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  // Track current slide for the dots
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="px-1">
      <Carousel
        opts={{ loop: true }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {featuredChapters.map((chapter) => (
            <CarouselItem key={chapter.id} className="pl-2">
              <div 
                className="bg-gradient-to-br from-saffron-50 to-earth-50 dark:from-earth-800 dark:to-earth-900 rounded-lg p-5 shadow-md border border-earth-100 dark:border-earth-700 h-full transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                onClick={() => navigate(`/chapters/${chapter.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-earth-900 dark:text-earth-50">
                      {chapter.name}
                    </h3>
                    <p className="text-xs text-earth-600 dark:text-earth-300 font-sanskrit">
                      {chapter.nameSanskrit}
                    </p>
                  </div>
                  <span className="bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/30 text-saffron-600 dark:text-saffron-400 rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm shadow-sm">
                    {chapter.id}
                  </span>
                </div>
                
                <div className="my-3 relative px-2 py-3">
                  <Quote className="absolute text-saffron-200 dark:text-saffron-800 h-8 w-8 -top-1 -left-1" />
                  <p className="text-earth-800 dark:text-earth-200 text-sm italic relative z-10 pl-3">
                    "{chapter.quote}"
                  </p>
                  <div className="text-right mt-1">
                    <span className="text-xs text-earth-600 dark:text-earth-400">
                      — Chapter {chapter.verseRef}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-earth-600 dark:text-earth-400 bg-white/50 dark:bg-earth-800/50 px-2 py-1 rounded-full">
                    {chapter.verses} verses
                  </span>
                  <button 
                    className="text-saffron-600 dark:text-saffron-400 text-sm flex items-center gap-1 group bg-saffron-50/80 dark:bg-saffron-900/20 px-2 py-1 rounded-full transition-colors hover:bg-saffron-100 dark:hover:bg-saffron-800/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/chapters/${chapter.id}`);
                    }}
                  >
                    Explore
                    <Heart className="h-4 w-4 group-hover:fill-saffron-500 transition-all" />
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced dot indicators */}
        <div className="flex justify-center gap-1 mt-4">
          {featuredChapters.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                current === index 
                  ? "w-6 bg-gradient-to-r from-saffron-400 to-saffron-500 dark:from-saffron-600 dark:to-saffron-500 shadow-sm" 
                  : "w-2 bg-earth-200 dark:bg-earth-700"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedChaptersCarousel;
