import { VoiceAnalysis } from '@/types/mental-health';
import { Mic, Clock, MessageSquare, Smile, Meh, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceAnalysisResultsProps {
  analysis: VoiceAnalysis;
}

export function VoiceAnalysisResults({ analysis }: VoiceAnalysisResultsProps) {
  const getSentimentIcon = () => {
    switch (analysis.sentiment) {
      case 'positive':
        return <Smile className="w-6 h-6 text-risk-low" />;
      case 'negative':
        return <Frown className="w-6 h-6 text-risk-high" />;
      default:
        return <Meh className="w-6 h-6 text-risk-medium" />;
    }
  };

  const getSentimentColor = () => {
    switch (analysis.sentiment) {
      case 'positive':
        return 'text-risk-low bg-risk-low/10 border-risk-low/30';
      case 'negative':
        return 'text-risk-high bg-risk-high/10 border-risk-high/30';
      default:
        return 'text-risk-medium bg-risk-medium/10 border-risk-medium/30';
    }
  };

  const metrics = [
    {
      label: 'Speech Rate',
      value: `${analysis.speechRate} WPM`,
      description: analysis.speechRate > 130 ? 'Normal range' : 'Below average',
      icon: Mic,
      isGood: analysis.speechRate > 130,
    },
    {
      label: 'Pause Frequency',
      value: analysis.pauseFrequency,
      description: analysis.pauseFrequency < 12 ? 'Normal' : 'Above average',
      icon: Clock,
      isGood: analysis.pauseFrequency < 12,
    },
    {
      label: 'Sentiment Score',
      value: `${Math.round(analysis.sentimentScore * 100)}%`,
      description: analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1),
      icon: MessageSquare,
      isGood: analysis.sentimentScore > 0.5,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overall Sentiment */}
      <div className={cn('p-6 rounded-xl border text-center', getSentimentColor())}>
        <div className="flex items-center justify-center gap-3">
          {getSentimentIcon()}
          <div>
            <h3 className="text-lg font-semibold capitalize">{analysis.sentiment} Sentiment Detected</h3>
            <p className="text-sm opacity-80">Based on your voice patterns</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="p-4 bg-muted/50 rounded-xl border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p
                className={cn(
                  'text-xs mt-1',
                  metric.isGood ? 'text-risk-low' : 'text-risk-medium'
                )}
              >
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Transcription */}
      <div className="p-4 bg-muted/30 rounded-xl border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Transcription
        </h4>
        <p className="text-sm text-muted-foreground italic">"{analysis.transcription}"</p>
      </div>
    </div>
  );
}
