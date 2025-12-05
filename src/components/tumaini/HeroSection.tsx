import { Heart, Shield, Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const features = [
    { icon: Heart, label: 'Compassionate Care' },
    { icon: Shield, label: 'Privacy First' },
    { icon: Brain, label: 'AI-Powered' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-serene/5" />
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-serene/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Early Mental Health Detection
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Mental Wellness,{' '}
            <span className="text-gradient">Predicted & Protected</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Tumaini AI uses advanced voice analysis and behavioral patterns to detect early warning signs 
            and provide timely interventions—keeping you one step ahead.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" onClick={onGetStarted} className="text-lg px-8 gap-2">
              Start Your Check-In
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn How It Works
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
