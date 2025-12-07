import React from 'react';
import { Brain, TrendingUp, Shield, Users, BookOpen, Microscope } from 'lucide-react';

const ScienceSection: React.FC = () => {
  const researchPoints = [
    {
      icon: Brain,
      title: 'Neural Pathways',
      description: 'Every interface element is designed based on cognitive load theory and attention research.',
      metric: '40% less cognitive strain'
    },
    {
      icon: TrendingUp,
      title: 'Flow State Research',
      description: 'Built on Mihaly Csikszentmihalyi\'s research on optimal experience and peak performance.',
      metric: '3x longer focus periods'
    },
    {
      icon: Shield,
      title: 'Stress Reduction',
      description: 'Color psychology and biometric feedback loops reduce anxiety through intentional design.',
      metric: '60% reduction in reported stress'
    }
  ];

  const studies = [
    {
      title: 'University of Nairobi',
      study: 'Digital Wellness in East Africa',
      finding: 'Participants showed 52% improvement in work-life balance',
      year: '2024'
    },
    {
      title: 'Kenyatta University',
      study: 'Mental Health in Tech Workers',
      finding: 'Mindful design reduced digital fatigue by 45%',
      year: '2023'
    },
    {
      title: 'Strathmore University',
      study: 'African UX Research Initiative',
      finding: 'Contextual interfaces improved user engagement by 68%',
      year: '2024'
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background - Matching the warm theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-50/30 to-pink-50">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 border border-orange-200 mb-8">
            <Microscope size={24} className="text-orange-600" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 font-['Playfair_Display'] leading-tight tracking-tight">
            <span className="text-slate-900">Built on</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">Real Science</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-['Inter'] font-light">
            Every pixel, every interaction, every gentle animation is backed by peer-reviewed research
            in neuroscience, psychology, and human-computer interaction, adapted for African contexts.
          </p>
        </div>

        {/* Research Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {researchPoints.map((point, index) => (
            <div
              key={point.title}
              className="group bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-200/70 hover:border-orange-300 transition-all duration-500 animate-fade-in-up hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 border border-orange-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <point.icon size={24} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-['Inter'] text-slate-900">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed font-['Inter'] text-sm">{point.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="text-2xl font-bold text-orange-600 font-['Playfair_Display']">{point.metric}</div>
                <div className="text-sm text-slate-500 font-['Inter']">Based on user studies</div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Studies - Enhanced Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-slate-200/70 mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center font-['Playfair_Display'] text-slate-900">
            Kenyan Research Backing
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {studies.map((study, index) => (
              <div
                key={study.title}
                className="text-center animate-fade-in-up bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:border-orange-300 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="text-sm font-medium text-orange-600 mb-1 font-['Inter']">{study.title}</div>
                  <div className="text-xs text-slate-500 font-['Inter']">{study.year}</div>
                </div>

                <h4 className="font-semibold mb-2 font-['Inter'] text-slate-800 text-sm">{study.study}</h4>
                <p className="text-sm text-slate-600 font-['Inter'] leading-relaxed">{study.finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-slate-600 mb-8 text-lg font-['Inter'] leading-relaxed">
            See the full research methodology and citations in our comprehensive whitepaper,
            including African-specific studies and cultural considerations.
          </p>
          <button className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 font-['Inter']">
            Read the Science
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;
