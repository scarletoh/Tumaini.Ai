export interface VoiceAnalysis {
  date: string;
  speechRate: number;
  pauseFrequency: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  transcription: string;
}

export interface SleepPattern {
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: number;
}

export interface DigitalBehavior {
  typingSpeed: number[];
  socialInteractions: number[];
  sleepPatterns: SleepPattern[];
  screenTime: number[];
  appUsage: { app: string; hours: number }[];
}

export interface Prediction {
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  timeline: { week: number; predictedScore: number }[];
  warningFlags: string[];
  factors: { factor: string; weight: number; trend: 'up' | 'down' | 'stable' }[];
}

export interface Intervention {
  id: string;
  type: 'breathing' | 'social' | 'physical' | 'mindfulness' | 'professional';
  recommendation: string;
  description: string;
  duration: string;
  completed: boolean;
  completedAt?: string;
}

export interface WeeklyTrend {
  date: string;
  score: number;
  indicators: string[];
}

export interface MentalHealthProfile {
  userId: string;
  name: string;
  currentScore: number;
  previousScore: number;
  weeklyTrends: WeeklyTrend[];
  voiceAnalysis: VoiceAnalysis[];
  digitalBehavior: DigitalBehavior;
  predictions: Prediction;
  interventions: Intervention[];
  lastUpdated: string;
}

export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available: string;
  isEmergency: boolean;
}
