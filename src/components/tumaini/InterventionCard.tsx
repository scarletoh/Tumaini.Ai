import { Wind, Users, Activity, Brain, Stethoscope, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Intervention } from '@/types/mental-health';
import { cn } from '@/lib/utils';

interface InterventionCardProps {
  intervention: Intervention;
  onComplete: (id: string) => void;
}

const typeConfig = {
  breathing: { icon: Wind, color: 'bg-calm/10 text-calm border-calm/30' },
  social: { icon: Users, color: 'bg-lavender/20 text-lavender border-lavender/30' },
  physical: { icon: Activity, color: 'bg-serene/10 text-serene border-serene/30' },
  mindfulness: { icon: Brain, color: 'bg-warm/10 text-warm border-warm/30' },
  professional: { icon: Stethoscope, color: 'bg-coral/20 text-coral border-coral/30' },
};

export function InterventionCard({ intervention, onComplete }: InterventionCardProps) {
  const config = typeConfig[intervention.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all duration-300',
        intervention.completed
          ? 'bg-muted/50 border-border opacity-70'
          : 'bg-card border-border hover:shadow-md'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-3 rounded-xl border', config.color)}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground truncate">
              {intervention.recommendation}
            </h4>
            <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="w-3 h-3" />
              {intervention.duration}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {intervention.description}
          </p>

          {!intervention.completed ? (
            <Button
              size="sm"
              variant="outline"
              className="mt-3"
              onClick={() => onComplete(intervention.id)}
            >
              Mark Complete
            </Button>
          ) : (
            <div className="flex items-center gap-1.5 mt-3 text-sm text-risk-low">
              <Check className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
