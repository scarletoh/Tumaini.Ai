import React, { useState } from "react";
import { Header } from "@/components/tumaini/Header";
import { HeroSection } from "@/components/tumaini/HeroSection";
import { Dashboard } from "@/components/tumaini/Dashboard";
import { VoiceCheckIn } from "@/components/tumaini/VoiceCheckIn";
import { ResourcesSection } from "@/components/tumaini/ResourcesSection";
import { Footer } from "@/components/tumaini/Footer";
import { useMentalHealth } from "@/hooks/use-mental-health";
import MoodTrackerPage from "@/pages/MoodTrackerPage";
import TryAIAgentSection from "@/components/tumaini/TryAIAgentSection";
import { useNavigate } from "react-router-dom";

type Section = 'home' | 'dashboard' | 'voice' | 'resources' | 'insights' | 'mood';

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('home');
  const { profile, completeIntervention, addVoiceAnalysis } = useMentalHealth();

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
  };

  const handleTryAIAgent = () => {
    setActiveSection('home');
    // Smooth scroll to chat section or handle navigation
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback to navigation if chat section is not found
      navigate('/chat');
    }
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
          <div className="relative overflow-hidden">
            <HeroSection onGetStarted={() => setActiveSection('dashboard')} />
            <div className="relative z-10">
              <TryAIAgentSection onTryAIAgent={handleTryAIAgent} />
            </div>
            {/* Decorative background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-50 to-transparent rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-50 to-transparent rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>
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
