import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TryAIAgentSectionProps {
  onTryAIAgent?: () => void;
}

const TryAIAgentSection = ({ onTryAIAgent }: TryAIAgentSectionProps) => {
  const navigate = useNavigate();

  const handleTryAIAgent = () => {
    if (onTryAIAgent) {
      onTryAIAgent();
    } else {
      navigate('/chat');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 drop-shadow-sm">
            Experience the Future
          </span>{' '}
          <span className="text-gray-900 dark:text-white">— Try Tumaini AI, Your Mental Health Companion</span>
        </h2>
        <p className="text-xl text-gray-800 dark:text-gray-200 mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
          Get instant support, track your mood, and access mental health resources. <span className="font-semibold text-gray-900 dark:text-white">No account required!</span>
        </p>
        <Button
          size="lg"
          onClick={handleTryAIAgent}
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl px-10 py-5 text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] mx-auto"
        >
          <Sparkles className="w-7 h-7 text-white" />
          Try Tumaini AI Assistant
        </Button>
      </div>
    </section>
  );
};

export default TryAIAgentSection;
