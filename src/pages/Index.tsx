
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import ChapterList from '../components/ChapterList';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span 
            className={`inline-block px-4 py-1.5 rounded-full bg-saffron-100 text-saffron-800 font-medium text-sm mb-5 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Ancient wisdom for modern life
          </span>
          
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-earth-900 leading-tight mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            श्रीमद्‍भगवद्‍गीता
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-earth-700 mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Explore the timeless wisdom of the Bhagavad Gita in Sanskrit, Hindi, and English
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <button 
              onClick={() => navigate('/chapters')}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-saffron-600 text-white font-medium transition-colors hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-offset-2"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Reading
            </button>
            
            <button 
              onClick={scrollToFeatures}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white border border-earth-300 text-earth-800 font-medium transition-colors hover:bg-earth-100 focus:outline-none focus:ring-2 focus:ring-earth-500 focus:ring-offset-2"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <button 
            onClick={scrollToFeatures}
            className={`animate-bounce p-2 rounded-full bg-white shadow-md text-earth-700 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 sm:px-6 md:px-8 bg-earth-50 container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-earth-900 text-center mb-12">
            Dive into Spiritual Wisdom
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8 text-saffron-600" />}
              title="Read Original Texts"
              description="Explore the original Sanskrit verses alongside Hindi and English translations."
              delay={0}
            />
            
            <FeatureCard 
              icon={<Headphones className="h-8 w-8 text-saffron-600" />}
              title="Listen to Verses"
              description="Listen to authentic pronunciations of Sanskrit verses with our audio feature."
              delay={1}
            />
            
            <FeatureCard 
              icon={<ChapterIcon className="h-8 w-8 text-saffron-600" />}
              title="18 Complete Chapters"
              description="Access all 18 chapters of the Bhagavad Gita with detailed explanations."
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Chapters Preview Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8 container-custom">
        <ChapterList className="max-w-6xl mx-auto" />
        
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigate('/chapters')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-saffron-600 text-white font-medium transition-colors hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-offset-2"
          >
            View All Chapters
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-earth-900 text-earth-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-serif text-xl font-medium text-white">श्रीमद्‍भगवद्‍गीता</h3>
              <p className="mt-1 text-sm text-earth-300">Ancient wisdom for the modern soul</p>
            </div>
            
            <div className="text-sm text-earth-400">
              &copy; {new Date().getFullYear()} Bhagavad Gita App. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Custom ChapterIcon component
const ChapterIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <path d="M8 7h6" />
    <path d="M8 11h8" />
  </svg>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`p-6 bg-white rounded-xl shadow-sm transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ 
        transitionDelay: `${delay * 0.1}s`,
        boxShadow: '0 4px 20px rgba(201, 176, 131, 0.1)',
        border: '1px solid rgba(232, 218, 187, 0.3)'
      }}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-medium text-earth-900 mb-2">
        {title}
      </h3>
      <p className="text-earth-700">
        {description}
      </p>
    </div>
  );
};

export default Index;
