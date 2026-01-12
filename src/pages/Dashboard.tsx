import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ReferralChart } from '@/components/dashboard/ReferralChart';
import { ReferralTable } from '@/components/dashboard/ReferralTable';
import { RewardsBreakdown } from '@/components/dashboard/RewardsBreakdown';
import { RankOverview } from '@/components/dashboard/RankOverview';
import { ReferralToolsCard } from '@/components/ReferralToolsCard';
import { supabase } from '@/integrations/supabase/client';
import { useCommissions, formatUSD, getTierLabel } from '@/hooks/useCommissions';
import { calculateRankInfo } from '@/components/dashboard/RankOverview';
import logoLight from '@/assets/u-topia-logo-light.png';
import badgeBronze from '@/assets/badge-bronze.png';
import badgeSilver from '@/assets/badge-silver.png';
import badgeGold from '@/assets/badge-gold.png';
import badgePlatinum from '@/assets/badge-platinum.png';
import badgeDiamond from '@/assets/badge-diamond.png';
import { 
  Users, 
  DollarSign, 
  Award, 
  TrendingUp,
  BookOpen,
  History,
  Loader2
} from 'lucide-react';

const tierBadges: Record<string, string> = {
  bronze: badgeBronze,
  silver: badgeSilver,
  gold: badgeGold,
  platinum: badgePlatinum,
  diamond: badgeDiamond,
};


const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { summary, affiliateStatus, activeReferrals, isLoading: commissionsLoading } = useCommissions();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentTier = affiliateStatus?.tier || 'bronze';
  const rankInfo = calculateRankInfo(activeReferrals);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Dashboard
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            Track your referrals, rewards, and progress
          </p>
          {/* Current Rank Display */}
          <p className="text-base text-muted-foreground">
            Current Rank: <span className="font-semibold bg-gradient-to-r from-[#f97316] to-[#fb923c] bg-clip-text text-transparent">{rankInfo.currentRank}</span>
          </p>
        </div>
      </section>

      {/* Metrics Summary */}
      <section className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Referrals"
            value={activeReferrals}
            icon={<Users className="w-5 h-5 text-primary" />}
            subtext="Verified referrals"
          />
          <MetricCard
            label="Pending Commissions"
            value={formatUSD(summary?.pending || 0)}
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            subtext="Awaiting approval"
          />
          <MetricCard
            label="Total Earned"
            value={formatUSD(summary?.total_earned || 0)}
            icon={<DollarSign className="w-5 h-5 text-primary" />}
            subtext="Approved + paid commissions"
          />
          <div className="feature-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <img src={tierBadges[currentTier] || badgeBronze} alt={`${currentTier} Badge`} className="w-10 h-10 object-contain" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{getTierLabel(currentTier)}</p>
            <p className="text-sm text-muted-foreground">Current Tier</p>
          </div>
        </div>
      </section>

      {/* Referral Tools */}
      <section className="container mx-auto px-6 pb-12">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">Your Referral Tools</h2>
          <p className="text-sm text-muted-foreground">
            Share your link to invite new users and businesses.
          </p>
        </div>
        <ReferralToolsCard />
      </section>

      {/* Referral Chart */}
      <section className="container mx-auto px-6 pb-12">
        <ReferralChart />
      </section>

      {/* Referral Table */}
      <section className="container mx-auto px-6 pb-12">
        <ReferralTable />
      </section>

      {/* Rewards Breakdown */}
      <section className="container mx-auto px-6 pb-12">
        <RewardsBreakdown summary={summary} isLoading={commissionsLoading} />
      </section>

      {/* Rank Overview */}
      <section className="container mx-auto px-6 pb-12">
        <RankOverview qualifyingReferrals={activeReferrals} />
      </section>

      {/* Action Buttons */}
      <section className="container mx-auto px-6 pb-20">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/refer-and-earn" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full gap-3 py-6 text-base rounded-xl border-border hover:border-primary/50 hover:bg-primary/5"
            >
              <BookOpen className="w-5 h-5" />
              View Referral Rules
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="flex-1 gap-3 py-6 text-base rounded-xl border-border hover:border-primary/50 hover:bg-primary/5"
            disabled
          >
            <History className="w-5 h-5" />
            Go to Rewards History
            <span className="text-xs text-muted-foreground">(Coming Soon)</span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1a] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoLight} alt="U-topia" className="h-8" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                U-topia puts YOU first – connecting modern banking, digital assets, and cross-chain opportunities in one universal wallet.
              </p>
            </div>

            {/* Follow U-topia */}
            <div>
              <h4 className="text-white font-semibold mb-5">Follow U-topia</h4>
              <ul className="space-y-3">
                <li><a href="https://t.me/+G6ntSwYCzjJkNzE0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Telegram</a></li>
                <li><a href="https://x.com/UCoinOfficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">X (Twitter)</a></li>
                <li><a href="https://www.linkedin.com/company/u-topia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/ucoinofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Instagram</a></li>
                <li><a href="https://discord.gg/qZB83k5HmX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Discord</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-5">Legal</h4>
              <ul className="space-y-3">
                <li><a href="https://docsend.com/view/3wjptrvw2c35gj8p" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="https://docsend.com/view/vkuhrcmbrhkqd7vp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} U-topia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
