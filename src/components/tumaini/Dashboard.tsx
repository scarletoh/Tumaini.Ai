import { MentalHealthProfile } from '@/types/mental-health';
import { MentalHealthScore } from './MentalHealthScore';
import { RiskBadge } from './RiskBadge';
import { TrendChart } from './TrendChart';
import { InterventionCard } from './InterventionCard';
import { PredictionTimeline } from './PredictionTimeline';
import { BehaviorCharts } from './BehaviorCharts';
import { Calendar, Activity, MessageCircle, Moon } from 'lucide-react';

interface DashboardProps {
  profile: MentalHealthProfile;
  onCompleteIntervention: (id: string) => void;
}

export function Dashboard({ profile, onCompleteIntervention }: DashboardProps) {
  const quickStats = [
    {
      label: 'Daily Check-ins',
      value: profile.voiceAnalysis.length,
      icon: MessageCircle,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Avg Sleep Quality',
      value: `${Math.round(profile.digitalBehavior.sleepPatterns.reduce((a, b) => a + b.quality, 0) / profile.digitalBehavior.sleepPatterns.length)}%`,
      icon: Moon,
      color: 'bg-lavender/20 text-lavender',
    },
    {
      label: 'Social Interactions',
      value: profile.digitalBehavior.socialInteractions.reduce((a, b) => a + b, 0),
      icon: Activity,
      color: 'bg-serene/10 text-serene',
    },
    {
      label: 'Streak',
      value: '7 days',
      icon: Calendar,
      color: 'bg-warm/10 text-warm',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Welcome back, {profile.name.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">Here's your mental wellness overview</p>
        </div>
        <RiskBadge level={profile.predictions.riskLevel} size="lg" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score & Trend */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <MentalHealthScore
                score={profile.currentScore}
                previousScore={profile.previousScore}
                size="lg"
              />
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Trend</h3>
                <TrendChart data={profile.weeklyTrends} height={180} />
              </div>
            </div>
          </div>

          {/* Behavior Analytics */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Digital Behavior Patterns</h3>
            <BehaviorCharts behavior={profile.digitalBehavior} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Predictions */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">AI Predictions</h3>
            <PredictionTimeline predictions={profile.predictions} />
          </div>

          {/* Interventions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              {profile.interventions.slice(0, 4).map((intervention) => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                  onComplete={onCompleteIntervention}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
