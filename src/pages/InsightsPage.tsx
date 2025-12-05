import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Insights } from '@/components/tumaini/InsightsPage';
import { VoiceAnalysis } from '@/types/mental-health';
import { useMentalHealth } from '@/hooks/use-mental-health';
import { Header } from '@/components/tumaini/Header';
import { Footer } from '@/components/tumaini/Footer';

export default function InsightsPage() {
  const navigate = useNavigate();
  const { analysisHistory } = useMentalHealth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Insights 
          analysisHistory={analysisHistory} 
          onBack={handleBack} 
        />
      </main>
      <Footer />
    </div>
  );
}
