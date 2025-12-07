import { useState, useEffect } from 'react';
import { Menu, X, Heart, Globe, ChevronDown, ChevronUp, MessageCircle, Check, Plus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [showHabitTracker, setShowHabitTracker] = useState(false);
  const [showAddHabitForm, setShowAddHabitForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🌟');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink Water', completed: false, icon: '💧' },
    { id: 2, name: 'Exercise', completed: false, icon: '🏋️' },
    { id: 3, name: 'Meditate', completed: false, icon: '🧘' },
  ]);
  
  const habitIcons = ['💧', '🏋️', '🧘', '📚', '💤', '🍎', '🚶', '📝', '🎯', '🧠', '❤️', '🌱'];

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
      label: t('home'), 
      section: 'home',
      href: '/#home'
    },
    { 
      label: t('dashboard'), 
      section: 'dashboard',
      href: '/#dashboard'
    },
    { 
      label: t('features'), 
      section: 'features',
      href: '/#features',
      subItems: [
        { label: t('voiceAnalysis'), section: 'voice', href: '/#voice' },
        { label: t('moodTracking'), section: 'mood', href: '/mood-tracker' },
        { 
          label: t('wellnessInsights'), 
          section: 'insights', 
          isExternal: true,
          href: '/insights' 
        },
      ]
    },
    { 
      label: t('chat'), 
      section: 'chat',
      isExternal: true,
      href: '/chat'
    },
    { 
      label: t('resources'), 
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

  const toggleLanguage = (lang?: 'en' | 'sw') => {
    if (lang) {
      setLanguage(lang);
    } else {
      setLanguage(language === 'en' ? 'sw' : 'en');
    }
    setIsLanguageOpen(false);
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      const newHabit = {
        id: Date.now(),
        name: newHabitName,
        completed: false,
        icon: selectedIcon
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setSelectedIcon('🌟');
      setShowAddHabitForm(false);
    }
  };

  const handleDeleteHabit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;

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
          <div className="flex items-center gap-4">
            {/* Language Switcher with Enhanced Hover */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'English' : 'Swahili'}</span>
                <span className="sm:hidden">{language === 'en' ? 'EN' : 'SW'}</span>
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-primary ml-1"
                  animate={{ opacity: isLanguageOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Button>
              
              <motion.div 
                data-language-menu
                className="absolute right-0 mt-2 w-40 bg-background rounded-lg shadow-xl border border-border/50 overflow-hidden z-50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLanguageOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                  <p className="text-xs font-medium text-primary">{t('selectLanguage')}</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      language === 'en' 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-foreground/80 hover:bg-accent/50'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-sm">EN</span>
                    {t('english')}
                    {language === 'en' && <Check className="w-4 h-4 ml-auto text-primary" />}
                  </button>
                  <button
                    onClick={() => toggleLanguage('sw')}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      language === 'sw' 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-foreground/80 hover:bg-accent/50'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-sm">SW</span>
                    {t('swahili')}
                    {language === 'sw' && <Check className="w-4 h-4 ml-auto text-primary" />}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Habit Tracker */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-1.5 text-muted-foreground hover:text-foreground"
                onClick={() => setShowHabitTracker(!showHabitTracker)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="relative
                  w-8 h-8 rounded-lg flex items-center justify-center
                  bg-gradient-to-br from-primary/10 to-primary/5
                  transition-all duration-200 ease-in-out
                  border border-border/30
                ">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {completedHabits > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded-full bg-primary text-white">
                      {completedHabits}
                    </span>
                  )}
                </div>
              </Button>

              {/* Habit Tracker Popover */}
              <AnimatePresence>
                {showHabitTracker && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowHabitTracker(false)}
                    />
                    <motion.div
                      data-habit-tracker
                      className="absolute right-0 mt-2 w-64 bg-background rounded-lg shadow-xl border border-border/50 overflow-hidden z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-3 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Daily Habits</h3>
                          <span className="text-xs text-muted-foreground">
                            {completedHabits}/{totalHabits} {t('completed')}
                          </span>
                        </div>
                        <div className="w-full bg-accent/30 h-1.5 rounded-full mt-2 overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(completedHabits / totalHabits) * 100}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                      <div className="p-2 space-y-1">
                        {habits.map(habit => (
                          <div 
                            key={habit.id}
                            onClick={() => toggleHabit(habit.id)}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                              habit.completed 
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                                : 'hover:bg-accent/50'
                            }`}
                          >
                            <div className="relative group">
                              <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                habit.completed 
                                  ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-300' 
                                  : 'bg-accent text-muted-foreground'
                              }`}>
                                {habit.completed ? <Check className="w-3.5 h-3.5" /> : <span>{habit.icon}</span>}
                              </div>
                              <button 
                                onClick={(e) => handleDeleteHabit(habit.id, e)}
                                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
                                title="Delete habit"
                              >
                                ×
                              </button>
                            </div>
                            <span className="text-sm">{habit.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {habit.completed ? t('completed') : t('tapToComplete')}
                            </span>
                          </div>
                        ))}
                      </div>
                      {showAddHabitForm ? (
                        <div className="p-3 border-t border-border/30">
                          <form onSubmit={handleAddHabit} className="space-y-3">
                            <div>
                              <label htmlFor="habitName" className="block text-xs font-medium text-muted-foreground mb-1">
                                {t('habitName')}
                              </label>
                              <input
                                type="text"
                                id="habitName"
                                value={newHabitName}
                                onChange={(e) => setNewHabitName(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                                placeholder={t('enterHabitName')}
                                autoFocus
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-muted-foreground mb-1">
                                {t('selectIcon')}
                              </label>
                              <div className="grid grid-cols-6 gap-2">
                                {habitIcons.map((icon) => (
                                  <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md text-lg transition-colors ${
                                      selectedIcon === icon
                                        ? 'bg-primary/20 text-primary border border-primary/30'
                                        : 'bg-accent/30 hover:bg-accent/50'
                                    }`}
                                  >
                                    {icon}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="submit"
                                className="flex-1 py-1.5 px-3 text-xs font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                              >
                                {t('addHabit')}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowAddHabitForm(false)}
                                className="py-1.5 px-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {t('cancel')}
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div className="p-2 border-t border-border/30 bg-accent/10">
                          <button 
                            onClick={() => setShowAddHabitForm(true)}
                            className="w-full py-1.5 px-3 text-xs font-medium text-primary hover:bg-primary/10 rounded-md transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            {t('addNewHabit')}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

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
