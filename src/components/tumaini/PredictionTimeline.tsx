import { Prediction } from '@/types/mental-health';
import { TrendingUp, TrendingDown, Minus, Brain, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionTimelineProps {
  predictions: Prediction;
}

export function PredictionTimeline({ predictions }: PredictionTimelineProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-risk-low" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-risk-high" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Thinking Animation */}
      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="relative">
          <Brain className="w-8 h-8 text-primary" />
          <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">AI Analysis Active</p>
          <p className="text-xs text-muted-foreground">
            {predictions.confidence * 100}% confidence in predictions
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">4-Week Forecast</h4>
        <div className="flex items-end justify-between gap-2 h-24">
          {predictions.timeline.map((week, index) => {
            const height = (week.predictedScore / 100) * 100;
            const isImproved = index > 0 && week.predictedScore > predictions.timeline[index - 1].predictedScore;
            
            return (
              <div key={week.week} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'w-full rounded-t-lg transition-all duration-500',
                    isImproved ? 'bg-risk-low' : 'bg-primary'
                  )}
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">Week {week.week}</span>
                <span className="text-sm font-medium text-foreground">{week.predictedScore}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contributing Factors */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Key Factors</h4>
        <div className="space-y-2">
          {predictions.factors.map((factor) => (
            <div
              key={factor.factor}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                {getTrendIcon(factor.trend)}
                <span className="text-sm text-foreground">{factor.factor}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${factor.weight * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(factor.weight * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Flags */}
      {predictions.warningFlags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Warning Indicators</h4>
          <div className="space-y-2">
            {predictions.warningFlags.map((flag, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-risk-medium/10 border border-risk-medium/30 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-risk-medium mt-1.5 shrink-0" />
                <span className="text-sm text-foreground">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
