import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Referral {
  id: string;
  name: string;
  signupDate: string;
  verificationStatus: 'Verified' | 'Pending' | 'Inactive';
  activityStatus: 'Active' | 'Low' | 'None';
  rewardEligibility: 'Eligible' | 'Not Yet' | 'Ineligible';
}

// Placeholder data
const mockReferrals: Referral[] = [
  { id: '1', name: 'User A***', signupDate: '2025-01-05', verificationStatus: 'Verified', activityStatus: 'Active', rewardEligibility: 'Eligible' },
  { id: '2', name: 'User B***', signupDate: '2025-01-04', verificationStatus: 'Verified', activityStatus: 'Active', rewardEligibility: 'Eligible' },
  { id: '3', name: 'User C***', signupDate: '2025-01-03', verificationStatus: 'Pending', activityStatus: 'None', rewardEligibility: 'Not Yet' },
  { id: '4', name: 'User D***', signupDate: '2025-01-02', verificationStatus: 'Verified', activityStatus: 'Low', rewardEligibility: 'Not Yet' },
  { id: '5', name: 'User E***', signupDate: '2024-12-28', verificationStatus: 'Inactive', activityStatus: 'None', rewardEligibility: 'Ineligible' },
  { id: '6', name: 'User F***', signupDate: '2024-12-25', verificationStatus: 'Verified', activityStatus: 'Active', rewardEligibility: 'Eligible' },
];

type FilterStatus = 'All' | 'Verified' | 'Pending' | 'Inactive';

export function ReferralTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

  const filteredReferrals = mockReferrals.filter(referral => {
    const matchesSearch = referral.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || referral.verificationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string, type: 'verification' | 'activity' | 'reward') => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    if (type === 'verification') {
      switch (status) {
        case 'Verified':
          return `${baseClasses} bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`;
        case 'Pending':
          return `${baseClasses} bg-amber-500/10 text-amber-600 border border-amber-500/20`;
        case 'Inactive':
          return `${baseClasses} bg-gray-500/10 text-gray-500 border border-gray-500/20`;
      }
    }
    
    if (type === 'activity') {
      switch (status) {
        case 'Active':
          return `${baseClasses} bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`;
        case 'Low':
          return `${baseClasses} bg-amber-500/10 text-amber-600 border border-amber-500/20`;
        case 'None':
          return `${baseClasses} bg-gray-500/10 text-gray-500 border border-gray-500/20`;
      }
    }
    
    if (type === 'reward') {
      switch (status) {
        case 'Eligible':
          return `${baseClasses} bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`;
        case 'Not Yet':
          return `${baseClasses} bg-amber-500/10 text-amber-600 border border-amber-500/20`;
        case 'Ineligible':
          return `${baseClasses} bg-red-500/10 text-red-500 border border-red-500/20`;
      }
    }
    
    return baseClasses;
  };

  return (
    <div className="feature-card p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Referred Users</h3>
          <p className="text-sm text-muted-foreground">View your recent referrals and their status</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-secondary/50 border-border"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl">
              Status: {filterStatus}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterStatus('All')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('Verified')}>Verified</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('Pending')}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('Inactive')}>Inactive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 md:-mx-8">
        <div className="min-w-[600px] px-6 md:px-8">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Sign-up Date</TableHead>
                <TableHead className="text-muted-foreground">Verification</TableHead>
                <TableHead className="text-muted-foreground">Activity</TableHead>
                <TableHead className="text-muted-foreground">Reward Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.map((referral, index) => (
                <TableRow 
                  key={referral.id} 
                  className={`border-border ${index % 2 === 0 ? 'bg-secondary/20' : ''}`}
                >
                  <TableCell className="font-medium text-foreground">{referral.name}</TableCell>
                  <TableCell className="text-muted-foreground">{referral.signupDate}</TableCell>
                  <TableCell>
                    <span className={getStatusBadge(referral.verificationStatus, 'verification')}>
                      {referral.verificationStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={getStatusBadge(referral.activityStatus, 'activity')}>
                      {referral.activityStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={getStatusBadge(referral.rewardEligibility, 'reward')}>
                      {referral.rewardEligibility}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredReferrals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No referrals found matching your criteria.
        </div>
      )}
    </div>
  );
}
