
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BookOpen, Heart, MessageSquare } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      <Header showBackButton onBack={handleBack} />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-saffron-100 text-saffron-800 font-medium text-sm mb-5">
              About
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-earth-900 mb-4">
              About the Bhagavad Gita App
            </h1>
            <p className="text-lg text-earth-700 max-w-3xl mx-auto">
              Our mission is to make the timeless wisdom of the Bhagavad Gita accessible to everyone.
            </p>
          </div>
          
          <div className="verse-card mb-8 animate-fade-in">
            <h2 className="text-2xl font-serif font-medium text-earth-900 mb-4">
              What is the Bhagavad Gita?
            </h2>
            <p className="text-earth-700 mb-4">
              The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Prince Arjuna and Krishna, who serves as his charioteer.
            </p>
            <p className="text-earth-700 mb-4">
              The dialogue covers a broad range of spiritual topics, touching upon ethical dilemmas and philosophical issues that go far beyond the immediate context of the battlefield of Kurukshetra, where the conversation takes place.
            </p>
            <p className="text-earth-700">
              The Bhagavad Gita presents a synthesis of Hindu ideas about dharma, theistic bhakti, and the yogic ideals of moksha. It has been described as a concise guide to Hindu philosophy and a practical, self-contained guide to life.
            </p>
          </div>
          
          <div className="verse-card mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-serif font-medium text-earth-900 mb-4">
              About This App
            </h2>
            <p className="text-earth-700 mb-4">
              This application is designed to provide a beautiful, intuitive interface for exploring the Bhagavad Gita in its original Sanskrit, along with Hindi and English translations.
            </p>
            <p className="text-earth-700 mb-4">
              Features of the app include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-earth-700 mb-4">
              <li>Complete text of all 18 chapters of the Bhagavad Gita</li>
              <li>Original Sanskrit verses with accurate transliterations</li>
              <li>Hindi and English translations</li>
              <li>Audio recitations of the Sanskrit verses</li>
              <li>Clean, minimalist interface for distraction-free reading</li>
              <li>Modern, responsive design that works on all devices</li>
            </ul>
            <p className="text-earth-700">
              We are constantly working to improve the app and add new features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="verse-card text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center mb-4 text-saffron-600">
                <BookOpen size={36} />
              </div>
              <h3 className="text-xl font-serif font-medium text-earth-900 mb-2">
                Authentic Content
              </h3>
              <p className="text-earth-700">
                Carefully translated and reviewed by scholars of Sanskrit and Hindu philosophy.
              </p>
            </div>
            
            <div className="verse-card text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center mb-4 text-saffron-600">
                <Heart size={36} />
              </div>
              <h3 className="text-xl font-serif font-medium text-earth-900 mb-2">
                Made with Love
              </h3>
              <p className="text-earth-700">
                Created with devotion and respect for the profound wisdom of the Bhagavad Gita.
              </p>
            </div>
            
            <div className="verse-card text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex justify-center mb-4 text-saffron-600">
                <MessageSquare size={36} />
              </div>
              <h3 className="text-xl font-serif font-medium text-earth-900 mb-2">
                Community Driven
              </h3>
              <p className="text-earth-700">
                We welcome feedback and contributions to make this app better for everyone.
              </p>
            </div>
          </div>
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

export default About;
