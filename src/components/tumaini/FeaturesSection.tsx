import { BrainCircuit, ShieldCheck, Activity, HeartPulse, MessageSquareText, Users, Zap, Clock, BarChart3, Sparkles, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const FeatureCard = ({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });
  
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-100">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-emerald-100/30 transition-all duration-700 group-hover:scale-150 group-hover:bg-emerald-100/50" />
      <div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-emerald-100/30 transition-all duration-700 group-hover:scale-150 group-hover:bg-emerald-100/50" />
    </motion.div>
  );
};

export function FeaturesSection() {
  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-emerald-600" />,
      title: "AI-Powered Analysis",
      description: "Our advanced algorithms analyze voice patterns, speech content, and behavioral cues to detect early signs of mental health concerns."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "Privacy First",
      description: "Your data is encrypted and stored securely. We prioritize your privacy and comply with all healthcare data protection regulations."
    },
    {
      icon: <Activity className="w-8 h-8 text-emerald-600" />,
      title: "Real-time Monitoring",
      description: "Track your mental wellness over time with our intuitive dashboard and receive personalized insights and recommendations."
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-emerald-600" />,
      title: "Personalized Care",
      description: "Get tailored recommendations and exercises based on your unique needs and progress."
    },
    {
      icon: <MessageSquareText className="w-8 h-8 text-emerald-600" />,
      title: "24/7 Support",
      description: "Access our AI wellness assistant anytime for immediate support and guidance."
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Community",
      description: "Connect with others on similar journeys in our supportive community space."
    }
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-6 leading-tight font-display tracking-tight">
            Elevate Your Mental Wellbeing
          </h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the intersection of cutting-edge technology and compassionate care, designed to support your mental health journey with precision and empathy.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
