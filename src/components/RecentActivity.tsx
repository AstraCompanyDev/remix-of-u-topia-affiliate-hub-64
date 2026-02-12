import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const activities = [
  { id: 1, text: "New referral signed up", time: "2 hours ago" },
  { id: 2, text: "Commission approved — $45.00", time: "5 hours ago" },
  { id: 3, text: "Tier upgrade to Gold", time: "1 day ago" },
  { id: 4, text: "Withdrawal processed — $250.00", time: "2 days ago" },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <p className="text-sm">{a.text}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
