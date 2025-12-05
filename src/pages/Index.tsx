import React, { useState } from "react";
import { Header } from "@/components/tumaini/Header";
import { HeroSection } from "@/components/tumaini/HeroSection";
import { Dashboard } from "@/components/tumaini/Dashboard";
import { VoiceCheckIn } from "@/components/tumaini/VoiceCheckIn";
import { ResourcesSection } from "@/components/tumaini/ResourcesSection";
import { HomeContent } from "@/components/tumaini/HomeContent";
import { Footer } from "@/components/tumaini/Footer";
import { useMentalHealth } from "@/hooks/use-mental-health";
import MoodTrackerPage from "@/pages/MoodTrackerPage";

type Section = 'home' | 'dashboard' | 'voice' | 'resources' | 'insights' | 'mood';

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
          <div className="container mx-auto px-4 pt-16 pb-8">
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
          <div className="container mx-auto px-4 pt-16 pb-8">
            <Dashboard profile={profile} onCompleteIntervention={completeIntervention} />
          </div>
        );
      case 'mood':
        return <MoodTrackerPage />;
      default:
        return (
          <>
            <HeroSection onGetStarted={() => setActiveSection('dashboard')} />
            <HomeContent onGetStarted={() => setActiveSection('dashboard')} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
