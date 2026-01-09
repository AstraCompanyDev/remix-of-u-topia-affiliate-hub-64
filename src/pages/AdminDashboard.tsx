import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { AdminMetricCard } from '@/components/admin/AdminMetricCard';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import { UsersTable } from '@/components/admin/UsersTable';
import { AdminControls } from '@/components/admin/AdminControls';
import { TierBreakdown } from '@/components/admin/TierBreakdown';
import { useAdmin } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoLight from '@/assets/u-topia-logo-light.png';
import { 
  Users, 
  UserCheck, 
  Link2, 
  DollarSign, 
  Gift, 
  Clock,
  Loader2,
  Shield,
  Calendar
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setIsAuthLoading(false);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && !isAuthLoading) {
      toast({
        title: "Access Denied",
        description: "You don't have access to that page.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [isAdmin, adminLoading, isAuthLoading, navigate, toast]);

  if (isAuthLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  // Placeholder metrics
  const metrics = {
    totalUsers: 156,
    verifiedUsers: 128,
    totalReferrals: 342,
    activeReferrals: 89,
    qualifyingRevenue: 45230,
    rewardsPaid: 12450,
    rewardsPending: 3280,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                <Shield className="w-3 h-3" />
                Admin Mode
              </Badge>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground">
              Platform-wide overview and management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Global Metrics */}
      <section className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminMetricCard
            label="Total Users"
            value={metrics.totalUsers}
            icon={<Users className="w-5 h-5 text-primary" />}
            subtext="Registered accounts"
            trend={{ value: '+12%', isPositive: true }}
          />
          <AdminMetricCard
            label="Verified Users"
            value={metrics.verifiedUsers}
            icon={<UserCheck className="w-5 h-5 text-primary" />}
            subtext={`${Math.round((metrics.verifiedUsers / metrics.totalUsers) * 100)}% verification rate`}
          />
          <AdminMetricCard
            label="Total Referrals"
            value={metrics.totalReferrals}
            icon={<Link2 className="w-5 h-5 text-primary" />}
            subtext="Referral links created"
          />
          <AdminMetricCard
            label="Active Referrals"
            value={metrics.activeReferrals}
            icon={<Link2 className="w-5 h-5 text-primary" />}
            subtext="Unconverted links"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <AdminMetricCard
            label="Qualifying Revenue"
            value={`$${metrics.qualifyingRevenue.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5 text-primary" />}
            subtext="Total platform revenue"
            trend={{ value: '+8.5%', isPositive: true }}
          />
          <AdminMetricCard
            label="Rewards Paid"
            value={`$${metrics.rewardsPaid.toLocaleString()}`}
            icon={<Gift className="w-5 h-5 text-primary" />}
            subtext="Total paid to affiliates"
          />
          <AdminMetricCard
            label="Rewards Pending"
            value={`$${metrics.rewardsPending.toLocaleString()}`}
            icon={<Clock className="w-5 h-5 text-primary" />}
            subtext="Awaiting payout"
          />
        </div>
      </section>

      {/* Tier Breakdown */}
      <section className="container mx-auto px-6 pb-12">
        <TierBreakdown />
      </section>

      {/* Activity Feed */}
      <section className="container mx-auto px-6 pb-12">
        <ActivityFeed />
      </section>

      {/* Users Table */}
      <section className="container mx-auto px-6 pb-12">
        <UsersTable />
      </section>

      {/* Admin Controls */}
      <section className="container mx-auto px-6 pb-20">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">Admin Controls</h2>
          <p className="text-sm text-muted-foreground">
            Manage platform settings and admin access
          </p>
        </div>
        <AdminControls />
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1a] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoLight} alt="U-topia" className="h-8" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                U-topia puts YOU first – connecting modern banking, digital assets, and cross-chain opportunities in one universal wallet.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5">Follow U-topia</h4>
              <ul className="space-y-3">
                <li><a href="https://t.me/+G6ntSwYCzjJkNzE0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Telegram</a></li>
                <li><a href="https://x.com/UCoinOfficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">X (Twitter)</a></li>
                <li><a href="https://www.linkedin.com/company/u-topia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5">Legal</h4>
              <ul className="space-y-3">
                <li><a href="https://docsend.com/view/3wjptrvw2c35gj8p" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="https://docsend.com/view/vkuhrcmbrhkqd7vp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

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

export default AdminDashboard;
