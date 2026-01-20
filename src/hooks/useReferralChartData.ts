import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, startOfDay, eachDayOfInterval, eachWeekOfInterval, startOfWeek, eachMonthOfInterval, startOfMonth } from 'date-fns';

export interface ChartDataPoint {
  name: string;
  referrals: number;
  verified: number;
}

type TimeRange = '7days' | '30days' | 'all';

export function useReferralChartData() {
  const [data7Days, setData7Days] = useState<ChartDataPoint[]>([]);
  const [data30Days, setData30Days] = useState<ChartDataPoint[]>([]);
  const [dataAllTime, setDataAllTime] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChartData = useCallback(async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setIsLoading(false);
        return;
      }

      const userId = session.session.user.id;

      // Fetch all referrals for this user
      const { data: referrals, error } = await supabase
        .from('referrals')
        .select('created_at, status, verified_at')
        .eq('referrer_user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching referral chart data:', error);
        setIsLoading(false);
        return;
      }

      if (!referrals || referrals.length === 0) {
        // Return empty data
        const emptyDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => ({
          name,
          referrals: 0,
          verified: 0,
        }));
        setData7Days(emptyDays);
        setData30Days([
          { name: 'Week 1', referrals: 0, verified: 0 },
          { name: 'Week 2', referrals: 0, verified: 0 },
          { name: 'Week 3', referrals: 0, verified: 0 },
          { name: 'Week 4', referrals: 0, verified: 0 },
        ]);
        setDataAllTime([]);
        setIsLoading(false);
        return;
      }

      const now = new Date();

      // 7-day data (by day)
      const last7Days = eachDayOfInterval({
        start: subDays(now, 6),
        end: now,
      });

      const sevenDayData = last7Days.map(day => {
        const dayStart = startOfDay(day);
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
        
        const dayReferrals = referrals.filter(r => {
          const created = new Date(r.created_at);
          return created >= dayStart && created < dayEnd;
        });

        const verified = dayReferrals.filter(r => r.status === 'active').length;

        return {
          name: format(day, 'EEE'),
          referrals: dayReferrals.length,
          verified,
        };
      });

      setData7Days(sevenDayData);

      // 30-day data (by week)
      const last30Days = eachWeekOfInterval({
        start: subDays(now, 27),
        end: now,
      }, { weekStartsOn: 1 });

      const thirtyDayData = last30Days.slice(0, 4).map((weekStart, index) => {
        const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const weekReferrals = referrals.filter(r => {
          const created = new Date(r.created_at);
          return created >= weekStart && created < weekEnd;
        });

        const verified = weekReferrals.filter(r => r.status === 'active').length;

        return {
          name: `Week ${index + 1}`,
          referrals: weekReferrals.length,
          verified,
        };
      });

      setData30Days(thirtyDayData);

      // All-time data (by month)
      if (referrals.length > 0) {
        const firstReferral = new Date(referrals[0].created_at);
        const months = eachMonthOfInterval({
          start: startOfMonth(firstReferral),
          end: now,
        });

        const allTimeData = months.slice(-12).map(monthStart => {
          const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1);
          
          const monthReferrals = referrals.filter(r => {
            const created = new Date(r.created_at);
            return created >= monthStart && created < monthEnd;
          });

          const verified = monthReferrals.filter(r => r.status === 'active').length;

          return {
            name: format(monthStart, 'MMM'),
            referrals: monthReferrals.length,
            verified,
          };
        });

        setDataAllTime(allTimeData);
      }

    } catch (err) {
      console.error('Error in fetchChartData:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const getData = (timeRange: TimeRange): ChartDataPoint[] => {
    switch (timeRange) {
      case '7days':
        return data7Days;
      case '30days':
        return data30Days;
      case 'all':
        return dataAllTime;
      default:
        return data7Days;
    }
  };

  return {
    data7Days,
    data30Days,
    dataAllTime,
    getData,
    isLoading,
    refetch: fetchChartData,
  };
}
