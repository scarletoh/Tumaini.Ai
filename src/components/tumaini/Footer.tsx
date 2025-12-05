import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Heart, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXIpIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXIpIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSI2MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDA3QUZGIi8+CjxzdGAgb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA3QUZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyIiB4MT0iNjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjYwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNBMjA3NUYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQTIwNzVGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyIiB4MT0iNjAiIHkxPSI2MCIgeDI9IjAiIHkyPSIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNBMjA3NUYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQTIwNzVGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=) repeat" />
      </div>
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Heart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Tumaini<span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Empowering mental wellness through AI-powered early detection and intervention for a healthier tomorrow.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {[
                { icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#', label: 'Facebook' },
                { icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#', label: 'Twitter' },
                { icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#', label: 'Instagram' },
                { icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />, href: '#', label: 'LinkedIn' },
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800/50"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 pb-2 border-b border-white/10">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="mt-8 sm:mt-0">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 pb-2 border-b border-white/10">Resources</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6 mt-8 sm:mt-0">
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="text-blue-400 mt-0.5 sm:mt-1 flex-shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  <div>
                    <p className="text-sm sm:text-base text-gray-300">
                      123 Wellness Street<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-blue-400 mt-0.5 sm:mt-1 flex-shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  <div>
                    <p className="text-sm sm:text-base text-gray-300">
                      Support: <a href="tel:+254700000000" className="hover:text-blue-400 transition-colors">+254 700 000000</a><br />
                      Emergency: <a href="tel:+254711000000" className="hover:text-blue-400 transition-colors">+254 711 000000</a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-blue-400 mt-0.5 sm:mt-1 flex-shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  <div>
                    <p className="text-sm sm:text-base text-gray-300">
                      <a href="mailto:info@tumainiai.com" className="hover:text-blue-400 transition-colors">info@tumainiai.com</a><br />
                      <a href="mailto:support@tumainiai.com" className="hover:text-blue-400 transition-colors">support@tumainiai.com</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Stay Updated</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-3">Subscribe to our mental wellness newsletter</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-10 sm:h-auto bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/50 text-sm"
                />
                <Button 
                  type="submit" 
                  className="h-10 sm:h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 whitespace-nowrap text-sm sm:text-base"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400">
            <div className="text-center sm:text-left space-y-1 sm:space-y-2">
              <div>© {new Date().getFullYear()} Tumaini AI. All rights reserved.</div>
              <div className="text-xs text-gray-500">
                Empowering mental wellness through AI technology
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Shield className="text-blue-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Your privacy is our priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

