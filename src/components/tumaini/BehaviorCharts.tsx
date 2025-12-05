import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DigitalBehavior } from '@/types/mental-health';

interface BehaviorChartsProps {
  behavior: DigitalBehavior;
}

export function BehaviorCharts({ behavior }: BehaviorChartsProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const socialData = behavior.socialInteractions.map((count, i) => ({
    day: days[i],
    interactions: count,
  }));

  const sleepData = behavior.sleepPatterns.map((pattern, i) => ({
    day: days[i],
    quality: pattern.quality,
  }));

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--calm-blue))',
    'hsl(var(--serene-green))',
    'hsl(var(--warm-amber))',
    'hsl(var(--soft-lavender))',
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Social Interactions */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">Social Interactions</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={socialData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="interactions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sleep Quality */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">Sleep Quality</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={sleepData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="quality" fill="hsl(var(--serene-green))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* App Usage */}
      <div className="bg-card rounded-xl border border-border p-4 lg:col-span-2">
        <h4 className="text-sm font-semibold text-foreground mb-4">App Usage Distribution</h4>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width="50%" height={180}>
            <PieChart>
              <Pie
                data={behavior.appUsage}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="hours"
              >
                {behavior.appUsage.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {behavior.appUsage.map((item, index) => (
              <div key={item.app} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-foreground">{item.app}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
