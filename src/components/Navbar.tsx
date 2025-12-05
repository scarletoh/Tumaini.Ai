
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, MessageSquare } from "lucide-react";
import { LanguageSelector } from "./tumaini/LanguageSelector";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    try {
      navigate(path);
      setIsMenuOpen(false);
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = path;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="#" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Pulse Robot"
        >
          <img 
            src="/logo.svg" 
            alt="Pulse Robot Logo" 
            className="h-7 sm:h-8" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'text-emerald-600 font-medium' : 'text-gray-600 hover:text-emerald-600'}`}
            onClick={scrollToTop}
          >
            Home
          </Link>
          <button 
            onClick={(e) => handleNavigation('/chat', e)}
            className={`flex items-center space-x-1 nav-link ${isActive('/chat') ? 'text-emerald-600 font-medium' : 'text-gray-600 hover:text-emerald-600'}`}
          >
            <MessageSquare size={16} />
            <span>Chat</span>
          </button>
          <a href="#features" className="nav-link text-gray-600 hover:text-emerald-600">About</a>
          <a href="#details" className="nav-link text-gray-600 hover:text-emerald-600">Contact</a>
        </nav>

        <div className="flex items-center">
          {/* Language Selector - Desktop */}
          <div className="hidden md:block mr-4">
            <LanguageSelector />
          </div>
          
          {/* Mobile menu button - increased touch target */}
          <button 
            className="md:hidden text-gray-700 p-3 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-4 items-center mt-8">
          <Link 
            to="/" 
            className={`w-full text-center py-3 px-6 rounded-lg ${
              isActive('/') 
                ? 'bg-emerald-50 text-emerald-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => {
              scrollToTop();
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </Link>
          <button 
            onClick={(e) => handleNavigation('/chat', e)}
            className={`w-full text-center py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${
              isActive('/chat')
                ? 'bg-emerald-50 text-emerald-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={18} />
            <span>Chat</span>
          </button>
          <a 
            href="#features" 
            className="w-full text-center py-3 px-6 rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="#details" 
            className="w-full text-center py-3 px-6 rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
          
          {/* Language Selector - Mobile */}
          <div className="w-full pt-4 border-t border-gray-100">
            <div className="px-6 py-3">
              <p className="text-sm text-gray-500 mb-2">Select Language</p>
              <LanguageSelector />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
