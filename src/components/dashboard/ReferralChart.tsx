import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

// Placeholder data
const mockData7Days = [
  { name: 'Mon', referrals: 2, verified: 1 },
  { name: 'Tue', referrals: 3, verified: 2 },
  { name: 'Wed', referrals: 1, verified: 1 },
  { name: 'Thu', referrals: 4, verified: 3 },
  { name: 'Fri', referrals: 2, verified: 2 },
  { name: 'Sat', referrals: 5, verified: 4 },
  { name: 'Sun', referrals: 3, verified: 2 },
];

const mockData30Days = [
  { name: 'Week 1', referrals: 12, verified: 8 },
  { name: 'Week 2', referrals: 18, verified: 14 },
  { name: 'Week 3', referrals: 15, verified: 12 },
  { name: 'Week 4', referrals: 22, verified: 18 },
];

const mockDataAllTime = [
  { name: 'Jan', referrals: 45, verified: 35 },
  { name: 'Feb', referrals: 52, verified: 42 },
  { name: 'Mar', referrals: 38, verified: 30 },
  { name: 'Apr', referrals: 65, verified: 55 },
  { name: 'May', referrals: 72, verified: 60 },
  { name: 'Jun', referrals: 58, verified: 48 },
];

type TimeRange = '7days' | '30days' | 'all';

export function ReferralChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');

  const getData = () => {
    switch (timeRange) {
      case '7days':
        return mockData7Days;
      case '30days':
        return mockData30Days;
      case 'all':
        return mockDataAllTime;
      default:
        return mockData7Days;
    }
  };

  return (
    <div className="feature-card p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Referral Activity Over Time</h3>
          <p className="text-sm text-muted-foreground">Track your referral performance</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7days')}
            className="rounded-lg"
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30days')}
            className="rounded-lg"
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('all')}
            className="rounded-lg"
          >
            All Time
          </Button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getData()} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="name" 
              className="text-xs text-muted-foreground"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px hsl(var(--foreground) / 0.1)'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="referrals" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
              name="Total Referrals"
            />
            <Line 
              type="monotone" 
              dataKey="verified" 
              stroke="hsl(145 60% 45%)" 
              strokeWidth={2}
              dot={{ fill: 'hsl(145 60% 45%)', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: 'hsl(145 60% 45%)' }}
              name="Verified"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Total Referrals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(145 60% 45%)' }} />
          <span className="text-sm text-muted-foreground">Verified</span>
        </div>
      </div>
    </div>
  );
}
