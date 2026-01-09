import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Eye, Ban, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface User {
  id: string;
  email: string;
  fullName?: string;
  signupDate: Date;
  isVerified: boolean;
  tier: string;
  rank: string;
  totalReferrals: number;
  rewardsEarned: number;
  rewardsPending: number;
  lastActive: Date;
}

// Placeholder data
const mockUsers: User[] = [
  { id: '1', email: 'john@example.com', fullName: 'John Doe', signupDate: new Date('2024-01-15'), isVerified: true, tier: 'Gold', rank: 'Gold', totalReferrals: 12, rewardsEarned: 450, rewardsPending: 75, lastActive: new Date() },
  { id: '2', email: 'jane@example.com', fullName: 'Jane Smith', signupDate: new Date('2024-02-20'), isVerified: true, tier: 'Silver', rank: 'Silver', totalReferrals: 8, rewardsEarned: 280, rewardsPending: 40, lastActive: new Date(Date.now() - 86400000) },
  { id: '3', email: 'bob@example.com', fullName: 'Bob Wilson', signupDate: new Date('2024-03-10'), isVerified: false, tier: 'Bronze', rank: 'Bronze', totalReferrals: 3, rewardsEarned: 90, rewardsPending: 15, lastActive: new Date(Date.now() - 172800000) },
  { id: '4', email: 'alice@example.com', fullName: 'Alice Brown', signupDate: new Date('2024-03-25'), isVerified: true, tier: 'Platinum', rank: 'Platinum', totalReferrals: 25, rewardsEarned: 1200, rewardsPending: 200, lastActive: new Date() },
  { id: '5', email: 'charlie@example.com', signupDate: new Date('2024-04-05'), isVerified: false, tier: 'Bronze', rank: 'Bronze', totalReferrals: 0, rewardsEarned: 0, rewardsPending: 0, lastActive: new Date(Date.now() - 604800000) },
];

const tierColors: Record<string, string> = {
  Bronze: 'bg-amber-700/10 text-amber-700',
  Silver: 'bg-gray-400/10 text-gray-400',
  Gold: 'bg-yellow-500/10 text-yellow-500',
  Platinum: 'bg-blue-400/10 text-blue-400',
  Diamond: 'bg-purple-400/10 text-purple-400',
};

export function UsersTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = mockUsers.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="feature-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">All Users</h3>
          <p className="text-sm text-muted-foreground">{filteredUsers.length} total users</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-full md:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Signup</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tier</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Referrals</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Earned</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Pending</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Active</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.fullName || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {format(user.signupDate, 'MMM d, yyyy')}
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={user.isVerified ? 'bg-green-500/10 text-green-500 border-0' : 'bg-yellow-500/10 text-yellow-500 border-0'}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={`${tierColors[user.tier] || tierColors.Bronze} border-0`}>
                    {user.tier}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-sm text-foreground font-medium">
                  {user.totalReferrals}
                </td>
                <td className="py-3 px-4 text-right text-sm text-primary font-medium">
                  ${user.rewardsEarned}
                </td>
                <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                  ${user.rewardsPending}
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {format(user.lastActive, 'MMM d, HH:mm')}
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/users/${user.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-yellow-600">
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend Rewards
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Flag className="w-4 h-4 mr-2" />
                        Flag Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
