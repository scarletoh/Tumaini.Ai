import { Heart, Shield, Brain, ArrowRight, PlayCircle, BarChart3, Sparkles, Check, Zap, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

// Particle component for the background
const Particle = ({ className }: { className?: string }) => {
  const size = Math.random() * 4 + 1;
  const duration = Math.random() * 2 + 3;
  const delay = Math.random() * 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  return (
    <motion.div
      className={`absolute rounded-full bg-white/10 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const count1 = useMotionValue(0);
  const count2 = useMotionValue(0);
  const count3 = useMotionValue(0);
  const count1Rounded = useTransform(count1, Math.round);
  const count2Rounded = useTransform(count2, Math.round);
  const count3Rounded = useTransform(count3, (latest) => Math.round(latest) + '+');
  
  useEffect(() => {
    const controls1 = animate(count1, 95, { duration: 2.5, ease: 'easeOut' });
    const controls2 = animate(count2, 100, { duration: 2.5, ease: 'easeOut' });
    const controls3 = animate(count3, 10000, { duration: 2.5, ease: 'easeOut' });
    
    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/90 to-lime-50/90" />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-r from-emerald-100/60 to-green-100/60 rounded-full blur-3xl animate-float opacity-70" />
        <div className="absolute bottom-1/3 -right-20 w-[600px] h-[600px] bg-gradient-to-r from-lime-100/60 to-emerald-100/60 rounded-full blur-3xl animate-float opacity-70" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-r from-green-50/40 via-emerald-50/40 to-lime-50/40 blur-3xl opacity-60" />
        
        {/* Grid pattern removed as requested */}
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Particle key={i} className={i % 3 === 0 ? 'bg-emerald-300/30' : 'bg-green-200/20'} />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* Removed badge as requested */}
          
          {/* Headline with animated gradient */}
          <motion.h1 
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-tight mb-6"
          >
            <span className="relative">
              <span className="relative z-10">Transforming Mental</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-emerald-100 -rotate-1 -z-0" />
            </span>
            <br className="sm:hidden" />
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Healthcare with AI
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-emerald-50 -rotate-1 -z-0" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={item}
            className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tumaini AI uses advanced voice analysis and behavioral patterns to detect early warning signs and provide 
            timely interventions—keeping you one step ahead.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                onClick={onGetStarted} 
                className="relative overflow-hidden group text-lg px-8 py-6 gap-2 transition-all duration-300 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg shadow-emerald-100 hover:shadow-emerald-200/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Begin Voice Analysis</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="relative">
              <Button 
                variant="outline" 
                size="lg" 
                className="relative z-10 text-lg px-8 py-6 gap-2 group border-2 border-emerald-200 bg-white/90 hover:bg-white hover:border-emerald-300 transition-all duration-300 text-slate-700 hover:text-slate-900"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Watch Demo</span>
              </Button>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div 
          className="w-10 h-16 border-2 border-white/10 rounded-2xl flex justify-center p-1.5 backdrop-blur-sm"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div 
            className="w-2 h-2 bg-gradient-to-b from-primary to-cyan-400 rounded-full"
            animate={{
              y: [0, 20],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
