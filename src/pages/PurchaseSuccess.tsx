import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import logoLight from "@/assets/u-topia-logo-light.png";

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get("tier") || "membership";

  const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0f1a] border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={logoLight} alt="U-topia" className="h-8 md:h-10" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Success Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl" />
              <CheckCircle2 className="relative w-24 h-24 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-muted-foreground mb-2">
            Thank you for your purchase.
          </p>

          <p className="text-muted-foreground mb-8">
            Your <span className="text-primary font-semibold">{tierName}</span> membership is now active.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/purchase">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center">
              <img src={logoLight} alt="U-topia" className="h-6 invert dark:invert-0" />
            </Link>
            <p className="text-sm text-muted-foreground">
              © 2024 U-topia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PurchaseSuccess;
