import React, { useState } from "react";
import { Header } from "@/components/tumaini/Header";
import { HeroSection } from "@/components/tumaini/HeroSection";
import { Dashboard } from "@/components/tumaini/Dashboard";
import { VoiceCheckIn } from "@/components/tumaini/VoiceCheckIn";
import { ResourcesSection } from "@/components/tumaini/ResourcesSection";
import { useMentalHealth } from "@/hooks/use-mental-health";

type Section = 'home' | 'dashboard' | 'voice' | 'resources' | 'insights';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const { profile, completeIntervention, addVoiceAnalysis } = useMentalHealth();

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="container mx-auto px-4 py-8">
            <Dashboard profile={profile} onCompleteIntervention={completeIntervention} />
          </div>
        );
      case 'voice':
        return (
          <div className="container mx-auto px-4 py-8">
            <VoiceCheckIn 
              previousAnalysis={profile.voiceAnalysis} 
              onAnalysisComplete={addVoiceAnalysis} 
            />
          </div>
        );
      case 'resources':
        return <ResourcesSection />;
      case 'insights':
        return (
          <div className="container mx-auto px-4 py-8">
            <Dashboard profile={profile} onCompleteIntervention={completeIntervention} />
          </div>
        );
      default:
        return <HeroSection onGetStarted={() => setActiveSection('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
