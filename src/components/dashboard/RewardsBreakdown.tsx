import { DollarSign, Percent, Gift, Clock, CheckCircle } from 'lucide-react';

interface RewardCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant?: 'default' | 'pending' | 'paid';
}

function RewardCard({ label, value, icon, variant = 'default' }: RewardCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'pending':
        return 'border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent';
      case 'paid':
        return 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent';
      default:
        return '';
    }
  };

  return (
    <div className={`feature-card p-5 ${getVariantStyles()}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}

export function RewardsBreakdown() {
  // Placeholder data
  const rewards = {
    commissions: '$245.00',
    dividends: '$120.50',
    bonuses: '$75.00',
    pendingPayouts: '$85.00',
    paidPayouts: '$355.50',
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Rewards Breakdown</h3>
        <p className="text-sm text-muted-foreground">View your earnings by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RewardCard
          label="Commissions"
          value={rewards.commissions}
          icon={<DollarSign className="w-4 h-4 text-primary" />}
        />
        <RewardCard
          label="Dividends"
          value={rewards.dividends}
          icon={<Percent className="w-4 h-4 text-primary" />}
        />
        <RewardCard
          label="Bonuses"
          value={rewards.bonuses}
          icon={<Gift className="w-4 h-4 text-primary" />}
        />
        <RewardCard
          label="Pending Payouts"
          value={rewards.pendingPayouts}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
          variant="pending"
        />
        <RewardCard
          label="Paid Payouts"
          value={rewards.paidPayouts}
          icon={<CheckCircle className="w-4 h-4 text-emerald-500" />}
          variant="paid"
        />
      </div>
    </div>
  );
}
