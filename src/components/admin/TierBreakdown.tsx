import { Package } from 'lucide-react';

interface TierData {
  tier: string;
  count: number;
  revenue: number;
  color: string;
}

const tierData: TierData[] = [
  { tier: 'Bronze', count: 45, revenue: 4455, color: 'bg-amber-700' },
  { tier: 'Silver', count: 32, revenue: 6368, color: 'bg-gray-400' },
  { tier: 'Gold', count: 18, revenue: 8982, color: 'bg-yellow-500' },
  { tier: 'Platinum', count: 8, revenue: 7992, color: 'bg-blue-400' },
  { tier: 'Diamond', count: 3, revenue: 7497, color: 'bg-purple-400' },
];

const totalCount = tierData.reduce((sum, t) => sum + t.count, 0);

export function TierBreakdown() {
  return (
    <div className="feature-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Packages by Tier</h3>
          <p className="text-sm text-muted-foreground">{totalCount} total packages sold</p>
        </div>
      </div>

      <div className="space-y-4">
        {tierData.map((tier) => {
          const percentage = (tier.count / totalCount) * 100;
          return (
            <div key={tier.tier}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                  <span className="text-sm font-medium text-foreground">{tier.tier}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{tier.count} sold</span>
                  <span className="text-sm text-primary font-medium">${tier.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${tier.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Total Revenue</span>
          <span className="text-lg font-bold text-primary">
            ${tierData.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
