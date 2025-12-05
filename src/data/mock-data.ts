import { MentalHealthProfile, CrisisResource } from '@/types/mental-health';

export const mockProfile: MentalHealthProfile = {
  userId: 'user-001',
  name: 'Scar',
  currentScore: 72,
  previousScore: 68,
  weeklyTrends: [
    { date: '2024-11-25', score: 65, indicators: ['reduced social activity'] },
    { date: '2024-11-26', score: 63, indicators: ['irregular sleep'] },
    { date: '2024-11-27', score: 68, indicators: ['improved mood'] },
    { date: '2024-11-28', score: 70, indicators: ['normal patterns'] },
    { date: '2024-11-29', score: 67, indicators: ['slight fatigue'] },
    { date: '2024-11-30', score: 72, indicators: ['positive interactions'] },
    { date: '2024-12-01', score: 72, indicators: ['stable'] },
  ],
  voiceAnalysis: [
    {
      date: '2024-12-01',
      speechRate: 142,
      pauseFrequency: 8,
      sentiment: 'positive',
      sentimentScore: 0.72,
      transcription: "I'm feeling much better today. Had a good conversation with my friend and managed to finish my tasks at work.",
    },
    {
      date: '2024-11-30',
      speechRate: 128,
      pauseFrequency: 12,
      sentiment: 'neutral',
      sentimentScore: 0.55,
      transcription: "Today was okay. Nothing special happened but I got through the day.",
    },
    {
      date: '2024-11-29',
      speechRate: 118,
      pauseFrequency: 15,
      sentiment: 'negative',
      sentimentScore: 0.35,
      transcription: "I felt tired most of the day. Didn't really want to talk to anyone.",
    },
  ],
  digitalBehavior: {
    typingSpeed: [45, 42, 48, 50, 47, 52, 51],
    socialInteractions: [12, 8, 15, 18, 10, 22, 20],
    sleepPatterns: [
      { date: '2024-11-25', bedtime: '23:30', wakeTime: '07:00', quality: 65 },
      { date: '2024-11-26', bedtime: '01:00', wakeTime: '08:30', quality: 45 },
      { date: '2024-11-27', bedtime: '22:45', wakeTime: '06:45', quality: 78 },
      { date: '2024-11-28', bedtime: '23:00', wakeTime: '07:00', quality: 80 },
      { date: '2024-11-29', bedtime: '00:15', wakeTime: '07:30', quality: 55 },
      { date: '2024-11-30', bedtime: '22:30', wakeTime: '06:30', quality: 85 },
      { date: '2024-12-01', bedtime: '23:00', wakeTime: '07:00', quality: 82 },
    ],
    screenTime: [6.5, 8.2, 5.8, 4.5, 7.0, 5.2, 4.8],
    appUsage: [
      { app: 'Social Media', hours: 2.5 },
      { app: 'Messaging', hours: 1.8 },
      { app: 'Work', hours: 4.2 },
      { app: 'Entertainment', hours: 1.5 },
      { app: 'Health', hours: 0.5 },
    ],
  },
  predictions: {
    riskLevel: 'low',
    confidence: 0.85,
    timeline: [
      { week: 1, predictedScore: 74 },
      { week: 2, predictedScore: 76 },
      { week: 3, predictedScore: 75 },
      { week: 4, predictedScore: 78 },
    ],
    warningFlags: [],
    factors: [
      { factor: 'Sleep Quality', weight: 0.25, trend: 'up' },
      { factor: 'Social Interactions', weight: 0.2, trend: 'up' },
      { factor: 'Voice Sentiment', weight: 0.3, trend: 'stable' },
      { factor: 'Activity Patterns', weight: 0.25, trend: 'stable' },
    ],
  },
  interventions: [
    {
      id: '1',
      type: 'breathing',
      recommendation: '4-7-8 Breathing Exercise',
      description: 'Practice calming breath work for 5 minutes',
      duration: '5 min',
      completed: true,
      completedAt: '2024-12-01T08:30:00',
    },
    {
      id: '2',
      type: 'social',
      recommendation: 'Connect with a Friend',
      description: 'Reach out to someone you trust for a quick chat',
      duration: '15 min',
      completed: false,
    },
    {
      id: '3',
      type: 'physical',
      recommendation: 'Morning Walk',
      description: 'Take a 20-minute walk in natural light',
      duration: '20 min',
      completed: false,
    },
    {
      id: '4',
      type: 'mindfulness',
      recommendation: 'Gratitude Journaling',
      description: 'Write down 3 things you are grateful for today',
      duration: '10 min',
      completed: true,
      completedAt: '2024-12-01T22:00:00',
    },
  ],
  lastUpdated: new Date().toISOString(),
};

export const crisisResources: CrisisResource[] = [
  // Emergency Services
  {
    name: 'Kenya Red Cross',
    phone: '1199',
    description: 'Emergency mental health support and crisis intervention',
    available: '24/7',
    isEmergency: true,
    category: 'emergency'
  },
  {
    name: 'Befrienders Kenya',
    phone: '+254 722 178 177',
    description: 'Suicide prevention and emotional support helpline',
    available: '24/7',
    isEmergency: true,
    category: 'emergency'
  },
  
  // Hospitals & Clinics
  {
    name: 'Chiromo Lane Medical Centre',
    phone: '+254 20 271 4641',
    description: 'Professional psychiatric services and counseling',
    available: 'Mon-Fri 8AM-5PM',
    isEmergency: false,
    category: 'healthcare',
    website: 'https://chiromolane.org/'
  },
  {
    name: 'Mathare National Teaching Hospital',
    phone: '+254 20 263 3691',
    description: 'Public mental health facility with inpatient and outpatient services',
    available: '24/7',
    isEmergency: false,
    category: 'healthcare'
  },
  
  // Counseling & Therapy
  {
    name: 'Nairobi Women\'s Hospital - Gender Violence Recovery Centre',
    phone: '+254 719 072 000',
    description: 'Specialized care for survivors of gender-based violence',
    available: '24/7',
    isEmergency: true,
    category: 'counseling',
    website: 'https://nwch.co.ke/'
  },
  {
    name: 'Amani Counselling Centre',
    phone: '+254 20 387 4182',
    description: 'Affordable counseling and psychological services',
    available: 'Mon-Fri 8:30AM-4:30PM',
    isEmergency: false,
    category: 'counseling',
    website: 'https://www.amanikenya.org/'
  },
  
  // Support Groups
  {
    name: 'Mental 360',
    phone: '+254 700 333 033',
    description: 'Mental health advocacy and peer support groups',
    available: 'Mon-Fri 9AM-5PM',
    isEmergency: false,
    category: 'support',
    website: 'https://www.mental360.org/'
  },
  {
    name: 'Nafasi Arts Space',
    phone: '+254 700 000 000',
    description: 'Creative arts therapy and mental health support through arts',
    available: 'Check website for schedule',
    isEmergency: false,
    category: 'support',
    website: 'https://www.nafasiartspace.org/'
  },
  
  // Online Resources
  {
    name: 'Mind Your Mind KE',
    phone: '',
    description: 'Online mental health resources and community support',
    available: 'Online',
    isEmergency: false,
    category: 'online',
    website: 'https://www.mindyourmindke.com/'
  },
  {
    name: 'Shamiri Institute',
    phone: '',
    description: 'Research-based mental health interventions for youth',
    available: 'Online resources available',
    isEmergency: false,
    category: 'online',
    website: 'https://www.shamiri.institute/'
  },
  
  // Substance Abuse
  {
    name: 'NACADA Helpline',
    phone: '1192',
    description: 'National Authority for the Campaign Against Alcohol and Drug Abuse',
    available: '24/7',
    isEmergency: true,
    category: 'addiction'
  },
  {
    name: 'Chiromo Hospital - Addiction Treatment',
    phone: '+254 703 969 000',
    description: 'Specialized addiction treatment and rehabilitation',
    available: '24/7',
    isEmergency: false,
    category: 'addiction',
    website: 'https://chiromohospital.org/'
  },
  
  // Youth & Student Support
  {
    name: 'Nairobi Teen Mental Health',
    phone: '+254 720 123 456',
    description: 'Mental health services specifically for teenagers',
    available: 'Mon-Fri 9AM-5PM',
    isEmergency: false,
    category: 'youth',
    website: 'https://nairobiteenmh.org/'
  },
  {
    name: 'University of Nairobi Counselling Centre',
    phone: '+254 20 491 0000',
    description: 'Counseling services for university students',
    available: 'Mon-Fri 8AM-5PM',
    isEmergency: false,
    category: 'youth',
    website: 'https://uonbi.ac.ke/students/counselling-services/'
  }
];

export const earlyWarningProfile: MentalHealthProfile = {
  ...mockProfile,
  userId: 'user-002',
  name: 'Demo User (Early Warning)',
  currentScore: 52,
  previousScore: 65,
  predictions: {
    riskLevel: 'medium',
    confidence: 0.78,
    timeline: [
      { week: 1, predictedScore: 48 },
      { week: 2, predictedScore: 45 },
      { week: 3, predictedScore: 50 },
      { week: 4, predictedScore: 55 },
    ],
    warningFlags: [
      'Speech rate decreased by 20% over past week',
      'Social interactions reduced significantly',
      'Sleep pattern irregularity detected',
    ],
    factors: [
      { factor: 'Sleep Quality', weight: 0.25, trend: 'down' },
      { factor: 'Social Interactions', weight: 0.2, trend: 'down' },
      { factor: 'Voice Sentiment', weight: 0.3, trend: 'down' },
      { factor: 'Activity Patterns', weight: 0.25, trend: 'down' },
    ],
  },
};
