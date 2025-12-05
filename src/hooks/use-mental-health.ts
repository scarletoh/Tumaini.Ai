import { useState, useEffect } from 'react';
import { MentalHealthProfile, Intervention } from '@/types/mental-health';
import { mockProfile } from '@/data/mock-data';

const STORAGE_KEY = 'tumaini-mental-health-profile';

export function useMentalHealth() {
  const [profile, setProfile] = useState<MentalHealthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from storage or use mock data
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setProfile(mockProfile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProfile));
    }
    setIsLoading(false);
  }, []);

  const updateProfile = (updates: Partial<MentalHealthProfile>) => {
    if (!profile) return;
    
    const updated = {
      ...profile,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    
    setProfile(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const completeIntervention = (interventionId: string) => {
    if (!profile) return;

    const updatedInterventions = profile.interventions.map((i) =>
      i.id === interventionId
        ? { ...i, completed: true, completedAt: new Date().toISOString() }
        : i
    );

    updateProfile({ interventions: updatedInterventions });
  };

  const addVoiceAnalysis = (analysis: MentalHealthProfile['voiceAnalysis'][0]) => {
    if (!profile) return;

    const updatedAnalysis = [analysis, ...profile.voiceAnalysis].slice(0, 30);
    
    // Simulate score update based on sentiment
    const sentimentImpact = analysis.sentimentScore * 10;
    const newScore = Math.min(100, Math.max(0, profile.currentScore + (sentimentImpact - 5)));

    updateProfile({
      voiceAnalysis: updatedAnalysis,
      previousScore: profile.currentScore,
      currentScore: Math.round(newScore),
    });
  };

  const resetToDemo = () => {
    setProfile(mockProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProfile));
  };

  return {
    profile,
    isLoading,
    updateProfile,
    completeIntervention,
    addVoiceAnalysis,
    resetToDemo,
  };
}
