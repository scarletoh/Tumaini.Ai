import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MentalHealthScoreProps {
  score: number;
  previousScore: number;
  size?: 'sm' | 'md' | 'lg';
}

export function MentalHealthScore({ score, previousScore, size = 'md' }: MentalHealthScoreProps) {
  const trend = score - previousScore;
  const percentage = score;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const strokeWidth = size === 'lg' ? 8 : size === 'md' ? 6 : 4;
  const radius = size === 'lg' ? 80 : size === 'md' ? 60 : 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const scoreColor = useMemo(() => {
    if (score >= 70) return 'hsl(var(--risk-low))';
    if (score >= 40) return 'hsl(var(--risk-medium))';
    return 'hsl(var(--risk-high))';
  }, [score]);

  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor = trend > 0 ? 'text-risk-low' : trend < 0 ? 'text-risk-high' : 'text-muted-foreground';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display font-bold ${textSizes[size]}`} style={{ color: scoreColor }}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Score</span>
        </div>
      </div>

      {/* Trend indicator */}
      <div className={`flex items-center gap-1 ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {trend > 0 ? '+' : ''}{trend} from last week
        </span>
      </div>
    </div>
  );
}
