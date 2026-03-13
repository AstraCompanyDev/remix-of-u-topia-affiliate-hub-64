import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import {
  TrendingUp,
  Calendar,
  Newspaper,
  ExternalLink,
  Wallet,
  ArrowUpRight,
  Image,
  Copy,
  DollarSign,
  Users,
  Shield,
  Globe,
  Zap,
} from "lucide-react";
import RecentActivity from "@/components/RecentActivity";

const connections = [
  { id: 1, name: "Victoria Sterling", role: "Founding Member", status: "online" },
  { id: 2, name: "Marcus Chen", role: "Early Investor", status: "online" },
  { id: 3, name: "Elena Vasquez", role: "Board Advisor", status: "offline" },
  { id: 4, name: "James Whitmore", role: "Strategic Partner", status: "online" },
  { id: 5, name: "Aisha Patel", role: "Founding Member", status: "offline" },
];

const newsUpdates = [
  {
    id: 1,
    title: "Q4 2024 Performance Report Released",
    excerpt: "Review the latest quarterly performance metrics and strategic initiatives for the upcoming year.",
    date: "Dec 8, 2024",
    type: "report",
  },
  {
    id: 2,
    title: "U-Center Secures Series B Funding",
    excerpt: "We're thrilled to announce $50M in Series B funding to accelerate the future of banking.",
    date: "Dec 5, 2024",
    type: "announcement",
  },
  {
    id: 3,
    title: "New Digital Asset Features Coming Q1 2025",
    excerpt: "Exciting new cryptocurrency integration and DeFi features are on the roadmap for early next year.",
    date: "Dec 2, 2024",
    type: "product",
  },
  {
    id: 4,
    title: "Annual Members Meeting - Save the Date",
    excerpt: "Mark your calendars for our virtual annual meeting on January 15th, 2025.",
    date: "Nov 28, 2024",
    type: "event",
  },
];

const upcomingEvents = [
  { title: "Member Q&A Session", date: "Dec 12, 3:00 PM", type: "meeting" },
  { title: "Product Roadmap Preview", date: "Dec 18, 10:00 AM", type: "webinar" },
  { title: "Annual Meeting", date: "Jan 15, 2:00 PM", type: "event" },
];

export default function ShareholderPortal() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReadMore = (newsId: number) => {
    toast({
      title: "Opening Article",
      description: "Full article view coming soon.",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-32 -right-32 rounded-full blur-3xl opacity-15 bg-primary/30 animate-float" />
          <div className="absolute w-[300px] h-[300px] bottom-0 left-1/4 rounded-full blur-3xl opacity-10 bg-blue-500/30 animate-float animation-delay-2000" />
        </div>

        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Shield className="h-3 w-3 mr-1.5" />
              Members Portal
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="gradient-text">U-Center</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Your entry point to securing your financial future. Build, grow, and earn in the new era of banking — all from one portal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/auth">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg shadow-primary/25">
                  Join Today
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/purchase">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Secure & Transparent</p>
              <p className="text-xs text-gray-500">Your assets, your control</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Global Access</p>
              <p className="text-xs text-gray-500">Banking without borders</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Real Rewards</p>
              <p className="text-xs text-gray-500">Earn from real activity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">$12,450</p>
            <p className="text-xs text-gray-500">Total Earnings</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
              <ArrowUpRight className="h-3 w-3" />
              +8.2% this month
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">$2,180</p>
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-xs text-gray-600 mt-2">Awaiting clearance</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">5,240</p>
            <p className="text-xs text-gray-500">$U Tokens</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
              <ArrowUpRight className="h-3 w-3" />
              +15% value
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">85</p>
            <p className="text-xs text-gray-500">My Network</p>
            <p className="text-xs text-gray-600 mt-2">Total Connections</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Latest News - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
                Latest Updates
              </h2>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">View All</Button>
            </div>

            {/* Featured Post */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] group cursor-pointer hover:border-white/[0.12] transition-colors">
              <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/5 flex items-center justify-center">
                <Image className="h-12 w-12 text-primary/20" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    <Image className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                  <span className="text-xs text-gray-500">Dec 9, 2024</span>
                </div>
                <h4 className="font-semibold text-lg text-white group-hover:text-primary transition-colors">U-Center App Now Live</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Experience seamless banking with our newly launched mobile app. Traditional and non-custodial accounts, all in one place.
                </p>
              </div>
            </div>

            {newsUpdates.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors cursor-pointer group"
                onClick={() => handleReadMore(news.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="secondary" className="text-xs bg-white/[0.06] text-gray-300 border-white/[0.08]">
                        {news.type === "report" && "Report"}
                        {news.type === "announcement" && "Announcement"}
                        {news.type === "product" && "Product"}
                        {news.type === "event" && "Event"}
                      </Badge>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{news.title}</h4>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{news.excerpt}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Referral Code */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <Copy className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Your Referral Code
                </p>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 font-mono text-base font-bold tracking-widest text-center text-white">
                    UCENTER-2847X
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-white/10 hover:bg-white/5 text-white"
                    onClick={() => {
                      navigator.clipboard.writeText("UCENTER-2847X");
                      toast({ title: "Copied!", description: "Referral code copied to clipboard." });
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mb-3 text-center">
                  Share this code to earn commissions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-white/10 text-gray-300 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400"
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent("Join U-Center using my referral code: UCENTER-2847X")}`, "_blank")}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-white/10 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
                    onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent("https://ucenter.com")}&text=${encodeURIComponent("Join U-Center using my referral code: UCENTER-2847X")}`, "_blank")}
                  >
                    Telegram
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-white/10 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                    onClick={() => window.open(`mailto:?subject=${encodeURIComponent("Join U-Center!")}&body=${encodeURIComponent("Join U-Center using my referral code: UCENTER-2847X")}`, "_blank")}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Available to Withdraw */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                <DollarSign className="h-4 w-4 text-primary" />
                Available to Withdraw
              </p>
              <div className="text-3xl font-bold text-primary">$1,250.00</div>
              <p className="text-xs text-gray-500 mt-1">From referral commissions</p>
              <Button
                className="w-full mt-4"
                onClick={() => toast({ title: "Withdrawal Requested", description: "Your withdrawal request has been submitted." })}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Withdraw Funds
              </Button>
            </div>

            {/* Connections */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">Your Connections</p>
                <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">View All</Button>
              </div>
              <div className="space-y-3">
                {connections.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/15 text-primary text-xs">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-[#0a0f1a] ${c.status === "online" ? "bg-green-400" : "bg-gray-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{c.name}</p>
                      <p className="text-xs text-gray-500 truncate">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-primary" />
                Upcoming Events
              </p>
              <div className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                onClick={() => toast({ title: "Calendar Coming Soon", description: "Full event calendar will be available soon!" })}
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
