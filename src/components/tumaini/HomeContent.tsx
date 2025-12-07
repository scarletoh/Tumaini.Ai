import { Shield, Activity, Clock, Users, BarChart2, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { EmpathySection } from './EmpathySection';

interface HomeContentProps {
  onGetStarted: () => void;
}

export function HomeContent({ onGetStarted }: HomeContentProps) {
  const features = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and stored securely, with strict privacy controls.'
    },
    {
      icon: Activity,
      title: 'Real-time Analysis',
      description: 'Get instant insights from your voice patterns and behavior.'
    },
    {
      icon: Clock,
      title: 'Early Detection',
      description: 'Identify potential concerns 2-4 weeks before they become critical.'
    },
    {
      icon: Users,
      title: 'Professional Support',
      description: 'Connect with mental health professionals when you need them.'
    },
    {
      icon: BarChart2,
      title: 'Progress Tracking',
      description: 'Monitor your mental wellness journey with detailed analytics.'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Tailored recommendations based on your unique patterns.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up & Complete Profile',
      description: 'Create your account and share some basic information to personalize your experience.'
    },
    {
      number: '02',
      title: 'Regular Voice Check-ins',
      description: 'Complete brief voice recordings when prompted by the app (takes less than 2 minutes).'
    },
    {
      number: '03',
      title: 'Get Insights & Recommendations',
      description: 'Receive personalized insights and evidence-based recommendations.'
    }
  ];


  return (
    <>
      <EmpathySection />
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Empowering Your Mental Wellness Journey
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our advanced AI analyzes subtle patterns in your voice and behavior to provide personalized insights and support, helping you stay ahead of your mental wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data is encrypted end-to-end with enterprise-grade security. We never share your information without your explicit consent.",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50"
              },
              {
                icon: Activity,
                title: "Real-time Analysis",
                description: "Get instant insights from your voice patterns and behavior with our cutting-edge AI technology.",
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: Clock,
                title: "Early Detection",
                description: "Identify potential concerns 2-4 weeks before they become critical with our predictive analytics.",
                color: "text-amber-600",
                bgColor: "bg-amber-50"
              },
              {
                icon: Users,
                title: "Professional Support",
                description: "Seamlessly connect with licensed mental health professionals when you need additional support.",
                color: "text-purple-600",
                bgColor: "bg-purple-50"
              },
              {
                icon: BarChart2,
                title: "Progress Tracking",
                description: "Monitor your mental wellness journey with detailed analytics and personalized reports.",
                color: "text-cyan-600",
                bgColor: "bg-cyan-50"
              },
              {
                icon: Heart,
                title: "Personalized Care",
                description: "Receive tailored recommendations and exercises based on your unique needs and goals.",
                color: "text-rose-600",
                bgColor: "bg-rose-50"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                        Learn more
                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with Tumaini AI is simple and only takes a few minutes. Our intuitive process guides you every step of the way.
            </p>
          </motion.div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 -translate-y-1/2 z-0"></div>
            <div className="hidden md:flex absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 z-10">
              <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold mb-6 relative group">
                      <div className="absolute inset-0 rounded-2xl bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">{step.number}</span>
                      <div className="absolute -bottom-1 left-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{step.description}</p>
                    {index < steps.length - 1 && (
                      <div className="md:hidden mb-6 w-12 h-12 text-blue-400 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="px-10 py-7 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required • 7-day free trial</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your mental wellness?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who are proactively managing their mental health with Tumaini AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg"
            >
              Get Started for Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

// Helper component
function Star({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
