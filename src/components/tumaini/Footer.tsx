import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Heart, Brain, Shield, ArrowUp, Send, MessageSquare, Calendar, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Navigation link component
  const NavLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm"
    >
      <span className="w-5 h-5 mr-2 flex items-center justify-center text-emerald-500 group-hover:text-emerald-400 transition-colors">
        {icon}
      </span>
      <span className="relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 group-hover:after:w-full">
        {children}
      </span>
    </a>
  );

  // Section header component
  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
      {children}
    </h3>
  );

  // Card component
  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 rounded-xl border border-white/5 ${className}`}>
      {children}
    </div>
  );

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSI2MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMTA5NjY1Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEwOTY2NSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==') repeat" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Social */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Tumaini<span className="font-extrabold">AI</span>
              </h2>
            </motion.div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering mental wellness through AI-powered early detection and intervention for a healthier tomorrow.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 mt-4">
            <SectionHeader>Quick Links</SectionHeader>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink href={link.href} icon={link.icon}>
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 mt-4">
            <SectionHeader>Resources</SectionHeader>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <motion.li 
                  key={resource.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <NavLink href={resource.href} icon={resource.icon}>
                    {resource.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10">
              <SectionHeader>Newsletter</SectionHeader>
              <p className="text-sm text-gray-400 mb-4">Subscribe to get updates on new features and releases.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/5 border-0 text-white placeholder-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">We care about your data. Read our <a href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</a>.</p>
            </Card>
            
            <Card>
              <SectionHeader>Contact Us</SectionHeader>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-900/50 p-2 rounded-lg text-emerald-400 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Brookside Drive,<br />
                      Westlands, Kenya
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

      {/* Copyright Section */}
      <div className="border-t border-emerald-800/50 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Tumaini AI. All rights reserved.
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Built by Scar
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-gradient-to-br from-emerald-600 to-emerald-700 p-3 rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

