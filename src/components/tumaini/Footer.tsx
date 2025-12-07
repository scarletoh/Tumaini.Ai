import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Heart, Brain, Shield, ArrowUp, Send, MessageSquare, Calendar, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";
import Link from 'next/link';

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home', icon: <ArrowRight className="w-4 h-4" /> },
    { name: 'Features', href: '#features', icon: <Heart className="w-4 h-4" /> },
    { name: 'How It Works', href: '#how-it-works', icon: <Brain className="w-4 h-4" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'About Us', href: '/about', icon: <Users className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const resources = [
    { name: 'Blog', href: '/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Help Center', href: '/help', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Privacy Policy', href: '/privacy', icon: <Shield className="w-4 h-4" /> },
    { name: 'Terms of Service', href: '/terms', icon: <FileText className="w-4 h-4" /> },
    { name: 'Cookie Policy', href: '/cookies', icon: <Shield className="w-4 h-4" /> },
  ];
  
  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
  ];

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Memoized navigation link component for better performance
  const NavLink = memo(({ href, children, className = '' }: { 
    href: string; 
    children: React.ReactNode; 
    className?: string 
  }) => (
    <Link 
      href={href} 
      className={`text-sm text-gray-400 hover:text-white transition-colors inline-block group ${className}`}
      aria-label={typeof children === 'string' ? children : 'Link'}
    >
      <span className="relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-emerald-400 after:transition-all after:duration-200 group-hover:after:w-full">
        {children}
      </span>
    </Link>
  ));
  
  NavLink.displayName = 'NavLink';

  // Memoized section header component with subtle underline
  const SectionHeader = memo(({ children }: { children: React.ReactNode }) => (
    <h3 
      className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 pb-1.5 relative inline-block"
      aria-level={3}
    >
      {children}
      <span 
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-emerald-400/30 to-transparent"
        aria-hidden="true"
      />
    </h3>
  ));
  
  SectionHeader.displayName = 'SectionHeader';

  // Memoized card component with better accessibility
  const Card = memo(({ 
    children, 
    className = '' 
  }: { 
    children: React.ReactNode; 
    className?: string 
  }) => (
    <div 
      className={`bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-lg border border-white/5 backdrop-blur-sm ${className}`}
      role="region"
      aria-label="Card content"
    >
      {children}
    </div>
  ));
  
  Card.displayName = 'Card';

  return (
    <footer 
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white relative overflow-hidden border-t border-white/5"
      role="contentinfo"
      aria-label="Website footer"
    >
      {/* Decorative elements with reduced motion support */}
      <div className="absolute inset-0" aria-hidden="true">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        />
        <div 
          className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSI2MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMTA5NjY1Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEwOTY2NSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==') repeat"
          style={{
            willChange: 'opacity',
            transform: 'translateZ(0)'
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Social */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Tumaini<span className="font-extrabold">AI</span>
              </h2>
            </div>
            <p className="text-xs text-gray-400">
              Empowering mental wellness through AI-powered early detection.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <SectionHeader>Quick Links</SectionHeader>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink href={link.href}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <SectionHeader>Resources</SectionHeader>
            <ul className="space-y-2.5">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <NavLink href={resource.href}>
                    {resource.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 p-4">
              <SectionHeader>Newsletter</SectionHeader>
              <p className="text-xs text-gray-400 mb-3">Get updates on new features and releases.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="h-9 bg-white/5 border-0 text-white placeholder-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 text-xs"
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-emerald-500/20 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Subscribe
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <SectionHeader>Contact Us</SectionHeader>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-emerald-900/50 p-1.5 rounded-md text-emerald-400 flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">
                      Brookside Drive, Westlands, Kenya
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-emerald-900/50 p-2 rounded-lg text-emerald-400 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:info@tumani.ai" className="text-sm text-gray-300 hover:text-white transition-colors">
                    info@tumani.ai
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-emerald-900/50 p-2 rounded-lg text-emerald-400 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+254784416439" className="text-sm text-gray-300 hover:text-white transition-colors">
                    +254 78 441 6439
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Copyright Section - Optimized */}
      <div className="border-t border-emerald-800/50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Tumaini AI. All rights reserved.
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Built by Scar
              </p>
            </div>
            
            <nav aria-label="Legal links">
              <ul className="flex items-center flex-wrap justify-center gap-4 mt-2 md:mt-0">
                <li>
                  <Link 
                    href="/privacy" 
                    className="text-[11px] text-gray-400 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:ring-offset-1 focus:ring-offset-slate-900 rounded px-1"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms" 
                    className="text-[11px] text-gray-400 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:ring-offset-1 focus:ring-offset-slate-900 rounded px-1"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/cookies" 
                    className="text-[11px] text-gray-400 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:ring-offset-1 focus:ring-offset-slate-900 rounded px-1"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Optimized back to top button with reduced motion support */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 focus:ring-offset-slate-900 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Back to top"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

