
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Quote, Heart } from 'lucide-react';
import chapters from '../data/chapters';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const FeaturedChaptersCarousel = () => {
  const navigate = useNavigate();
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

  return (
    <div>
      <Carousel
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {featuredChapters.map((chapter) => (
            <CarouselItem key={chapter.id}>
              <div 
                className="bg-gradient-to-br from-saffron-50 to-earth-50 dark:from-earth-800 dark:to-earth-900 rounded-lg p-5 shadow-md border border-earth-100 dark:border-earth-700 h-full"
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
                  <span className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm">
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
                    className="text-saffron-600 dark:text-saffron-400 text-sm flex items-center gap-1 group"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/chapters/${chapter.id}`);
                    }}
                  >
                    Explore
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 bg-white/80 dark:bg-earth-800/80 hover:bg-white hover:dark:bg-earth-700" />
        <CarouselNext className="right-1 bg-white/80 dark:bg-earth-800/80 hover:bg-white hover:dark:bg-earth-700" />
      </Carousel>
    </div>
  );
};

export default FeaturedChaptersCarousel;
