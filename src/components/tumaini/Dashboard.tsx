import { MentalHealthProfile } from '@/types/mental-health';
import { MentalHealthScore } from './MentalHealthScore';
import { RiskBadge } from './RiskBadge';
import { TrendChart } from './TrendChart';
import { InterventionCard } from './InterventionCard';
import { PredictionTimeline } from './PredictionTimeline';
import { BehaviorCharts } from './BehaviorCharts';
import { 
  Calendar, 
  Activity, 
  MessageCircle, 
  Moon, 
  TrendingUp, 
  HeartPulse, 
  Sun, 
  Clock, 
  Zap, 
  Lightbulb, 
  CheckCircle2,
  ChevronRight,
  Smile,
  Meh,
  Frown,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DashboardProps {
  profile: MentalHealthProfile;
  onCompleteIntervention: (id: string) => void;
}

export function Dashboard({ profile, onCompleteIntervention }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'insights'>('overview');
  const [moodData, setMoodData] = useState<{date: string; mood: number}[]>([]);

  // Generate sample mood data for the past 7 days
  useEffect(() => {
    const moods = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      moods.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: Math.floor(Math.random() * 3) + 1 // 1-3 for different mood states
      });
    }
    
    setMoodData(moods);
  }, []);

  const quickStats = [
    {
      label: 'Daily Check-ins',
      value: profile.voiceAnalysis.length,
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-600',
      trend: 'up',
      change: '12% from last week'
    },
    {
      label: 'Sleep Quality',
      value: `${Math.round(profile.digitalBehavior.sleepPatterns.reduce((a, b) => a + b.quality, 0) / profile.digitalBehavior.sleepPatterns.length)}%`,
      icon: Moon,
      color: 'bg-indigo-100 text-indigo-600',
      trend: 'up',
      change: '5% improvement'
    },
    {
      label: 'Social Activity',
      value: profile.digitalBehavior.socialInteractions.reduce((a, b) => a + b, 0),
      icon: Activity,
      color: 'bg-green-100 text-green-600',
      trend: 'up',
      change: '3 more than last week'
    },
    {
      label: 'Wellness Streak',
      value: '7 days',
      icon: Zap,
      color: 'bg-amber-100 text-amber-600',
      trend: 'up',
      change: 'Keep it up!'
    },
    {
      label: 'Stress Level',
      value: `${100 - profile.currentScore}%`,
      icon: Activity,
      color: 'bg-red-100 text-red-600',
      trend: 'down',
      change: '8% lower than last week'
    },
  ];

  const wellnessTips = [
    {
      id: 1,
      title: 'Morning Meditation',
      description: 'Try a 5-minute meditation to start your day mindfully.',
      icon: Sun,
      completed: false
    },
    {
      id: 2,
      title: 'Digital Detox',
      description: 'Take a 1-hour break from screens before bed.',
      icon: Moon,
      completed: true
    },
    {
      id: 3,
      title: 'Gratitude Journal',
      description: 'Write down 3 things you\'re grateful for today.',
      icon: HeartPulse,
      completed: false
    }
  ];

  const recentActivities = [
    { id: 1, text: 'Completed daily check-in', time: '10 min ago', icon: CheckCircle2 },
    { id: 2, text: 'Listened to a guided meditation', time: '2 hours ago', icon: Activity },
    { id: 3, text: 'Received new wellness tips', time: '5 hours ago', icon: Lightbulb },
  ];

  return (
    <div className="space-y-6 pt-16 px-4 sm:px-6">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{profile.name.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's your mental wellness overview for today</p>
        </div>
        <div className="flex items-center gap-3">
          <RiskBadge level={profile.predictions.riskLevel} size="lg" />
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-lg ${stat.color.split(' ')[0]} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {stat.trend === 'up' ? '↑ ' : '↓ '}{stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {['Overview', 'Trends', 'Insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase() as 'overview' | 'trends' | 'insights')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.toLowerCase()
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score & Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <MentalHealthScore
                score={profile.currentScore}
                previousScore={profile.previousScore}
                size="lg"
              />
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Mood Trend</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div> Current</span>
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div> Previous</span>
                  </div>
                </div>
                <TrendChart data={profile.weeklyTrends} height={180} />
              </div>
            </div>
          </div>

          {/* Mood Tracker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mood Tracker</h3>
              <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center">
                View History <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="flex justify-between items-end h-40">
              {moodData.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">{day.date}</div>
                  <div 
                    className={`w-10 rounded-t-sm ${
                      day.mood === 1 ? 'bg-red-100 dark:bg-red-900/30 h-8' : 
                      day.mood === 2 ? 'bg-yellow-100 dark:bg-yellow-900/30 h-16' : 
                      'bg-green-100 dark:bg-green-900/30 h-24'
                    }`}
                  ></div>
                  <div className="mt-2">
                    {day.mood === 1 ? <Frown className="w-5 h-5 text-red-500" /> : 
                     day.mood === 2 ? <Meh className="w-5 h-5 text-yellow-500" /> : 
                     <Smile className="w-5 h-5 text-green-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Digital Behavior Patterns</h3>
            <BehaviorCharts behavior={profile.digitalBehavior} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Predictions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Predictions</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> Monitor
              </span>
            </div>
            <PredictionTimeline predictions={profile.predictions} />
          </div>

          {/* Wellness Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Wellness Tips</h3>
              <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {wellnessTips.map((tip) => (
                <div key={tip.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className={`p-2 rounded-lg ${tip.completed ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                    <tip.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{tip.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tip.description}</p>
                  </div>
                  <button className={`p-1 rounded-full ${tip.completed ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}>
                    <CheckCircle2 className={`w-5 h-5 ${tip.completed ? 'fill-emerald-100 text-emerald-600' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
