import { useState, useEffect } from 'react';
import { Menu, X, Heart, Globe, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  interface NavItem {
    label: string;
    section: string;
    subItems?: Array<{ label: string; section: string }>;
    isExternal?: boolean;
    href?: string;
  }

  const handleNavItemClick = (item: NavItem, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (item.isExternal && item.href) {
      // For external links (like /chat), use React Router's navigate
      navigate(item.href);
      setIsMenuOpen(false);
      window.scrollTo(0, 0);
    } else if (onNavigate) {
      // For internal navigation (sections on the same page)
      onNavigate(item.section);
      setIsMenuOpen(false);
    } else {
      // Fallback for direct page navigation
      navigate(`/#${item.section}`);
      setIsMenuOpen(false);
      window.scrollTo(0, 0);
    }
    setIsHovered(null);
  };

  const navItems = [
    { 
      label: 'Home', 
      section: 'home',
      href: '/#home'
    },
    { 
      label: 'Dashboard', 
      section: 'dashboard',
      href: '/#dashboard'
    },
    { 
      label: 'Features', 
      section: 'features',
      href: '/#features',
      subItems: [
        { label: 'Voice Analysis', section: 'voice', href: '/#voice' },
        { label: 'Mood Tracking', section: 'mood', href: '/mood-tracker' },
        { label: 'Wellness Insights', section: 'insights', href: '/#insights' },
      ]
    },
    { 
      label: 'Chat', 
      section: 'chat',
      isExternal: true,
      href: '/chat'
    },
    { 
      label: 'Resources', 
      section: 'resources',
      href: '/#resources'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sw' : 'en');
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm py-0 border-b border-gray-100 dark:border-gray-800' 
          : 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm py-2 border-b border-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo(0, 0);
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Tumaini<span className="font-extrabold">AI</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full">
            <ul className="flex items-center h-full">
              {navItems.map((item) => (
                <li 
                  key={item.section}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setIsHovered(item.section)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavItemClick(item, e)}
                      className={cn(
                        'relative px-4 h-full flex items-center text-sm font-medium transition-colors',
                        'text-muted-foreground hover:text-foreground group',
                        isHovered === item.section ? 'text-foreground' : ''
                      )}
                    >
                      <span className="relative z-10">
                        {item.label}
                      </span>
                      <span 
                        className={cn(
                          'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60',
                          'transform origin-left scale-x-0 transition-transform duration-300',
                          isHovered === item.section ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleNavItemClick(item)}
                      className={cn(
                        'relative px-4 h-full flex items-center text-sm font-medium transition-colors',
                        'text-muted-foreground hover:text-foreground group',
                        isHovered === item.section ? 'text-foreground' : ''
                      )}
                    >
                      <span className="relative z-10">
                        {item.label}
                        {item.subItems && (
                          <ChevronDown className="inline-block w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                        )}
                      </span>
                      <span 
                        className={cn(
                          'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60',
                          'transform origin-left scale-x-0 transition-transform duration-300',
                          isHovered === item.section ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </button>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.subItems && (
                    <AnimatePresence>
                      {isHovered === item.section && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-0 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                        >
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <button
                                key={subItem.section}
                                onClick={() => onNavigate?.(subItem.section)}
                                className="w-full px-4 py-2.5 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors"
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'SW'}</span>
              {isMenuOpen ? (
                <ChevronUp className="w-4 h-4 opacity-70" />
              ) : (
                <ChevronDown className="w-4 h-4 opacity-70" />
              )}
            </Button>

            <Button 
              size="sm" 
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
              onClick={(e) => {
                e.preventDefault();
                navigate('/#dashboard');
                window.scrollTo(0, 0);
              }}
            >
              <span className="font-medium">Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.section} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <button
                      onClick={() => {
                        if (item.isExternal && item.href) {
                          navigate(item.href);
                          setIsMenuOpen(false);
                          window.scrollTo(0, 0);
                        } else if (!item.subItems) {
                          onNavigate?.(item.section);
                          setIsMenuOpen(false);
                        } else {
                          setIsHovered(isHovered === item.section ? null : item.section);
                        }
                      }}
                      className="w-full flex items-center justify-between px-3 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.subItems && (
                        <ChevronDown 
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            isHovered === item.section ? 'rotate-180' : ''
                          )} 
                        />
                      )}
                    </button>
                    
                    {item.subItems && isHovered === item.section && (
                      <div className="pl-4 py-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.section}
                            onClick={() => {
                              onNavigate?.(subItem.section);
                              setIsMenuOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button 
                  size="sm" 
                  className="w-full mt-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-md"
                  onClick={() => {
                    onNavigate?.('dashboard');
                    setIsMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
