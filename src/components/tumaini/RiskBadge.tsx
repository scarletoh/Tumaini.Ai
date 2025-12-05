import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ level, showIcon = true, size = 'md' }: RiskBadgeProps) {
  const config = {
    low: {
      label: 'Low Risk',
      icon: CheckCircle,
      className: 'risk-badge-low',
    },
    medium: {
      label: 'Medium Risk',
      icon: AlertCircle,
      className: 'risk-badge-medium',
    },
    high: {
      label: 'High Risk',
      icon: AlertTriangle,
      className: 'risk-badge-high',
    },
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const { label, icon: Icon, className } = config[level];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        className,
        sizeClasses[size]
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {label}
    </span>
  );
}
