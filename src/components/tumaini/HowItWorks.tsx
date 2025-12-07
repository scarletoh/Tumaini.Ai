import { Mic, Activity, BarChart, MessageSquare, CheckCircle, Sparkles, ChevronRight, Shield } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const StepCard = ({ step, isActive, onClick }: { step: any, isActive: boolean, onClick: () => void }) => {
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ${
        isActive 
          ? 'ring-2 ring-emerald-500/50 shadow-md scale-[1.01]' 
          : 'hover:shadow-md hover:border-emerald-100'
      }`}
      whileHover={{ 
        y: -2,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div 
        className="h-full p-6 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
              isActive 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md' 
                : 'bg-emerald-50 text-emerald-500 border border-emerald-100'
            }`}>
              {step.icon}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${
                isActive ? 'text-gray-900' : 'text-gray-800'
              }`}>
                {step.title}
              </h3>
              <p className={`mt-1 text-sm ${
                isActive ? 'text-gray-600' : 'text-gray-500'
              }`}>
                {step.description}
              </p>
            </div>
          </div>
          <button className={`p-1.5 rounded-lg transition-colors ${
            isActive 
              ? 'text-emerald-500 hover:bg-emerald-50' 
              : 'text-gray-400 hover:bg-gray-50'
          }`}>
            <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
              isActive ? 'rotate-90' : ''
            }`} />
          </button>
        </div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-6 overflow-hidden"
            >
              <div className="pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 flex-1" />
                  <span className="text-xs font-medium tracking-wider text-emerald-500 uppercase">Key Benefits</span>
                  <div className="h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 flex-1" />
                </div>
                <ul className="space-y-3">
                  {step.details.map((detail: string, i: number) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-3 group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {detail}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle active state indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
      )}
    </motion.div>
  );
};

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  
  const toggleStep = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };
  
  // Auto-advance to next step after a delay
  useEffect(() => {
    if (activeStep !== null) {
      const timer = setTimeout(() => {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        } else if (activeStep === steps.length - 1) {
          // Optional: Loop back to first step
          // setActiveStep(0);
        }
      }, 5000); // Change step every 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [activeStep]);
  const steps = [
    {
      icon: <Mic className="w-5 h-5" />,
      title: "1. Record Your Voice",
      description: "Start a quick voice recording session",
      details: [
        "Speak naturally about your day or feelings",
        "No time limits or restrictions",
        "Secure and private recording process"
      ],
      cta: "Try voice recording now"
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "2. Advanced AI Analysis",
      description: "Our AI processes your speech patterns",
      details: [
        "Tone and emotion detection",
        "Natural language understanding",
        "Behavioral pattern recognition"
      ],
      cta: "Learn about our technology"
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: "3. Receive Insights",
      description: "Get detailed emotional analysis",
      details: [
        "Comprehensive mood reports",
        "Trend analysis over time",
        "Personalized recommendations"
      ],
      cta: "View sample insights"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "4. Get Personalized Support",
      description: "Tailored recommendations for you",
      details: [
        "Customized self-care exercises",
        "Therapist-approved techniques",
        "Actionable next steps"
      ],
      cta: "Explore recommendations"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "5. Track Your Journey",
      description: "Monitor your progress over time",
      details: [
        "Visual progress tracking",
        "Milestone achievements",
        "Personal growth insights"
      ],
      cta: "Start your journey"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Subtle background elements */}
      <motion.div 
        className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-3xl -z-10"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-32 w-96 h-96 bg-blue-100/30 rounded-full filter blur-3xl -z-10"
        style={{ y: y2 }}
      />
      
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-4 leading-tight font-display tracking-tight">
            Steps to Better Mental Health
          </h2>
          
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Simple, effective, and always here for you
          </p>
        </div>
        
        {/* Steps container */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6" ref={containerRef}>
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              step={step}
              isActive={activeStep === index}
              onClick={() => toggleStep(index)}
            />
          ))}
        </div>
        
        {/* Progress indicators */}
        <div className="mt-12 flex justify-center gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeStep === index 
                  ? 'w-8 bg-gradient-to-r from-emerald-400 to-teal-400' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
