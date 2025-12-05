import { Phone, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CrisisResource } from '@/types/mental-health';
import { cn } from '@/lib/utils';

interface CrisisResourceCardProps {
  resource: CrisisResource;
}

export function CrisisResourceCard({ resource }: CrisisResourceCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all duration-300',
        resource.isEmergency
          ? 'bg-destructive/5 border-destructive/30 hover:border-destructive/50'
          : 'bg-card border-border hover:border-primary/50'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {resource.isEmergency && (
              <AlertTriangle className="w-4 h-4 text-destructive" />
            )}
            <h4 className="font-semibold text-foreground">{resource.name}</h4>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Clock className="w-3 h-3" />
            {resource.available}
          </div>
        </div>

        <Button
          size="sm"
          variant={resource.isEmergency ? 'destructive' : 'outline'}
          className="shrink-0 gap-2"
          asChild
        >
          <a href={`tel:${resource.phone}`}>
            <Phone className="w-4 h-4" />
            Call
          </a>
        </Button>
      </div>
    </div>
  );
}
