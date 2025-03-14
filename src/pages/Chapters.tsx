
import { useEffect } from 'react';
import Header from '../components/Header';
import ChapterList from '../components/ChapterList';

const Chapters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-saffron-100 text-saffron-800 font-medium text-sm mb-5">
              Bhagavad Gita
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-earth-900 mb-4">
              Chapters of the Bhagavad Gita
            </h1>
            <p className="text-lg text-earth-700 max-w-3xl mx-auto">
              The Bhagavad Gita consists of 18 chapters, each focusing on different aspects of dharma, 
              karma, knowledge, devotion, and the path to spiritual enlightenment.
            </p>
          </div>
          
          <ChapterList />
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

export default Chapters;
