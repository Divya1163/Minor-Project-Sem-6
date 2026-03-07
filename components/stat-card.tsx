import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
}

export function StatCard({ title, value, subtitle, icon, variant = 'default' }: StatCardProps) {
  const variants = {
    default: 'bg-card border-border',
    accent: 'bg-accent/10 border-accent/30',
    secondary: 'bg-secondary border-border',
  };

  return (
    <Card className={`p-6 border ${variants[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-accent mt-2">{subtitle}</p>}
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    </Card>
  );
}
