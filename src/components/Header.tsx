
import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Update the type definition to make onBack only required when showBackButton is true
type HeaderProps = {
  showBackButton?: boolean;
  onBack?: () => void;
};

const Header = ({ showBackButton = false, onBack }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  },
  [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {showBackButton ? (
            <button 
              onClick={onBack}
              className="mr-2 p-1 text-earth-800 dark:text-earth-50 hover:text-primary dark:hover:text-primary-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-primary dark:text-primary-500" />
            <span className="font-serif text-xl font-medium text-earth-800 dark:text-earth-50">श्रीमद्‍भगवद्‍गीता</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/chapters" active={location.pathname.includes('/chapters')}>
            Chapters
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about'}>
            About
          </NavLink>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-earth-800 dark:text-earth-50 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark/95 backdrop-blur-md">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <NavLink to="/" active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/chapters" active={location.pathname.includes('/chapters')}>
              Chapters
            </NavLink>
            <NavLink to="/about" active={location.pathname === '/about'}>
              About
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ children, to, active = false }) => {
  return (
    <Link
      to={to}
      className={`transition-colors duration-300 font-medium ${
        active 
          ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' 
          : 'text-earth-700 dark:text-earth-200 hover:text-primary-600 dark:hover:text-primary-400'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
