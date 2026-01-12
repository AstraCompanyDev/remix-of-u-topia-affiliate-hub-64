import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useEnvironment } from '@/hooks/useEnvironment';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertTriangle, 
  UserPlus, 
  Link2, 
  DollarSign, 
  Trash2, 
  Loader2,
  CheckCircle2,
  XCircle,
  Shield
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function TestEnvironmentSettings() {
  const { toast } = useToast();
  const { mode, isTestMode, setMode, isLoading: envLoading } = useEnvironment();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isCreatingReferral, setIsCreatingReferral] = useState(false);
  const [isSimulatingRevenue, setIsSimulatingRevenue] = useState(false);
  const [isResettingData, setIsResettingData] = useState(false);
  const [isSwitchingMode, setIsSwitchingMode] = useState(false);

  const handleModeSwitch = async (checked: boolean) => {
    const newMode = checked ? 'production' : 'test';
    
    if (newMode === 'production') {
      // Don't allow switch to production directly - show warning
      toast({
        title: 'Production Mode',
        description: 'Switching to production mode requires additional validation. Please ensure all test scenarios have passed.',
        variant: 'destructive',
      });
      return;
    }

    setIsSwitchingMode(true);
    const success = await setMode(newMode);
    setIsSwitchingMode(false);

    if (success) {
      toast({
        title: 'Environment Updated',
        description: `Switched to ${newMode} mode.`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update environment mode.',
        variant: 'destructive',
      });
    }
  };

  const createTestUser = async () => {
    if (!isTestMode) {
      toast({
        title: 'Test Mode Required',
        description: 'This action is only available in test mode.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreatingUser(true);
    try {
      const testEmail = `test-user-${Date.now()}@test.utopia.local`;
      
      // Create test user via edge function
      const { data, error } = await supabase.functions.invoke('test-environment', {
        body: { 
          action: 'create_test_user',
          email: testEmail,
        },
      });

      if (error) throw error;

      toast({
        title: 'Test User Created',
        description: `Created test user: ${testEmail}`,
      });
    } catch (err) {
      console.error('Error creating test user:', err);
      toast({
        title: 'Error',
        description: 'Failed to create test user.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  const createTestReferral = async () => {
    if (!isTestMode) {
      toast({
        title: 'Test Mode Required',
        description: 'This action is only available in test mode.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreatingReferral(true);
    try {
      const { data, error } = await supabase.functions.invoke('test-environment', {
        body: { action: 'create_test_referral' },
      });

      if (error) throw error;

      toast({
        title: 'Test Referral Created',
        description: 'Created a test referral relationship.',
      });
    } catch (err) {
      console.error('Error creating test referral:', err);
      toast({
        title: 'Error',
        description: 'Failed to create test referral.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingReferral(false);
    }
  };

  const simulateRevenueEvent = async () => {
    if (!isTestMode) {
      toast({
        title: 'Test Mode Required',
        description: 'This action is only available in test mode.',
        variant: 'destructive',
      });
      return;
    }

    setIsSimulatingRevenue(true);
    try {
      const { data, error } = await supabase.functions.invoke('test-environment', {
        body: { 
          action: 'simulate_revenue_event',
          amount_usd: 250, // Simulate Silver package purchase
          tier: 'silver',
        },
      });

      if (error) throw error;

      toast({
        title: 'Revenue Event Simulated',
        description: `Created a test revenue event for $250. Commissions: ${data?.commissions_created || 0}`,
      });
    } catch (err) {
      console.error('Error simulating revenue:', err);
      toast({
        title: 'Error',
        description: 'Failed to simulate revenue event.',
        variant: 'destructive',
      });
    } finally {
      setIsSimulatingRevenue(false);
    }
  };

  const resetTestData = async () => {
    if (!isTestMode) {
      toast({
        title: 'Test Mode Required',
        description: 'This action is only available in test mode.',
        variant: 'destructive',
      });
      return;
    }

    setIsResettingData(true);
    try {
      const { data, error } = await supabase.functions.invoke('test-environment', {
        body: { action: 'reset_test_data' },
      });

      if (error) throw error;

      toast({
        title: 'Test Data Reset',
        description: 'All test data has been cleared.',
      });
    } catch (err) {
      console.error('Error resetting test data:', err);
      toast({
        title: 'Error',
        description: 'Failed to reset test data.',
        variant: 'destructive',
      });
    } finally {
      setIsResettingData(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Environment Mode Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Environment Mode</CardTitle>
              <CardDescription>Control the current operating environment</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
                isTestMode 
                  ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30' 
                  : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
              }`}>
                {mode.toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {isTestMode ? 'Test Mode Active' : 'Production Mode Active'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isTestMode 
                    ? 'All data is tagged as test data and can be reset' 
                    : 'Live production data - handle with care'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="mode-switch" className="text-sm text-muted-foreground">
                Production
              </Label>
              <Switch
                id="mode-switch"
                checked={!isTestMode}
                onCheckedChange={handleModeSwitch}
                disabled={envLoading || isSwitchingMode}
              />
            </div>
          </div>

          {isTestMode && (
            <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-600">Test Mode Warning</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    All actions performed in test mode create data tagged with <code className="px-1 py-0.5 bg-muted rounded">is_test=true</code>. 
                    This data is isolated from production and can be reset at any time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Controls Card - Only visible in test mode */}
      {isTestMode && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Test Controls</CardTitle>
            <CardDescription>Actions for testing the referral commission engine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Create Test User */}
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2"
                onClick={createTestUser}
                disabled={isCreatingUser}
              >
                <div className="flex items-center gap-2">
                  {isCreatingUser ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span className="font-medium">Create Test User</span>
                </div>
                <span className="text-xs text-muted-foreground text-left">
                  Creates a test user with random email
                </span>
              </Button>

              {/* Create Test Referral */}
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2"
                onClick={createTestReferral}
                disabled={isCreatingReferral}
              >
                <div className="flex items-center gap-2">
                  {isCreatingReferral ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                  <span className="font-medium">Create Test Referral</span>
                </div>
                <span className="text-xs text-muted-foreground text-left">
                  Creates a referral between test users
                </span>
              </Button>

              {/* Simulate Revenue Event */}
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2"
                onClick={simulateRevenueEvent}
                disabled={isSimulatingRevenue}
              >
                <div className="flex items-center gap-2">
                  {isSimulatingRevenue ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                  <span className="font-medium">Simulate Revenue Event</span>
                </div>
                <span className="text-xs text-muted-foreground text-left">
                  Creates a settled revenue event and calculates commissions
                </span>
              </Button>

              {/* Reset Test Data */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start gap-2 border-red-500/30 hover:bg-red-500/5"
                    disabled={isResettingData}
                  >
                    <div className="flex items-center gap-2 text-red-600">
                      {isResettingData ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span className="font-medium">Reset Test Data</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left">
                      Deletes all records where is_test=true
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Test Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all test data including test users, referrals, 
                      revenue events, and commissions. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={resetTestData}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reset All Test Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Checklist */}
      {isTestMode && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Pre-Production Checklist</CardTitle>
            <CardDescription>Verify these scenarios before switching to production</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'Referral links generate correctly',
                'Package purchases create revenue events',
                'Commissions calculate at correct percentages',
                'Tier depth limits are enforced',
                'Referral activation on purchase works',
                'Commission reversal scenarios tested',
                'Admin dashboard shows correct metrics',
                'Email notifications deliver properly',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                  <div className="w-5 h-5 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{index + 1}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
