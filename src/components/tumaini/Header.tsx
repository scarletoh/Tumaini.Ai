import { useState } from 'react';
import { Menu, X, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  const navItems = [
    { label: 'Dashboard', section: 'dashboard' },
    { label: 'Voice Check-in', section: 'voice' },
    { label: 'Insights', section: 'insights' },
    { label: 'Resources', section: 'resources' },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sw' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-calm flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Tumaini<span className="text-primary">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate?.(item.section)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'EN' : 'SW'}
            </Button>

            <Button size="sm" className="hidden sm:flex">
              Get Help Now
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => {
                  onNavigate?.(item.section);
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button size="sm" className="mt-2 mx-4">
              Get Help Now
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
