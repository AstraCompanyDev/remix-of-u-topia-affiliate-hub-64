import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoLight from "@/assets/u-topia-logo-light.png";
import { Eye, EyeOff, Mail, User, Phone, Briefcase, Lock, ArrowRight, Loader2, ArrowLeft } from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    mobile: "",
    password: "",
  });

  // Check for forgot mode from URL params
  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "forgot") {
      setMode("forgot");
    }
  }, [searchParams]);

  // Check if user is already logged in - redirect to home
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // If this is a password recovery event, redirect to the dedicated reset page
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
        return;
      }
      
      // For normal sign in, redirect to home
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Check for referral code in URL
  const referralCode = searchParams.get("ref");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (mode === "forgot") {
      if (!formData.email || !formData.email.includes("@")) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return false;
      }
      return true;
    }

    if (!formData.email || !formData.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return false;
    }

    if (mode === "signup" && !formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleForgotPassword = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      // Always show generic success message for security (don't reveal if email exists)
      toast({
        title: "Check Your Email",
        description: "If an account exists for this email, we've sent a password reset link.",
      });
      
      // Go back to sign in
      setMode("signin");
    } catch (err) {
      console.error("Forgot password error:", err);
      toast({
        title: "Something Went Wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "forgot") {
      await handleForgotPassword();
      return;
    }

    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (mode === "signup") {
        // Sign up
        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: formData.name.trim(),
              title: formData.title.trim(),
              mobile: formData.mobile.trim(),
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account Exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive",
            });
            setMode("signin");
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        // If there's a referral code, mark it as used
        if (referralCode && data.user) {
          try {
            await supabase.functions.invoke("referral-link", {
              body: {
                action: "use",
                code: referralCode,
                email: formData.email.trim().toLowerCase(),
              },
            });
          } catch (refError) {
            console.error("Error processing referral:", refError);
          }
        }

        if (data.user && !data.session) {
          toast({
            title: "Check Your Email",
            description: "We've sent you a confirmation link. Please check your inbox.",
          });
        } else if (data.session) {
          toast({
            title: "Welcome to U-topia!",
            description: "Your account has been created successfully.",
          });
          navigate("/");
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Invalid Credentials",
              description: "The email or password you entered is incorrect.",
              variant: "destructive",
            });
          } else if (error.message.includes("Email not confirmed")) {
            toast({
              title: "Email Not Confirmed",
              description: "Please check your inbox and confirm your email address.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign In Failed",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        if (data.session) {
          toast({
            title: "Welcome Back!",
            description: "You have signed in successfully.",
          });
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast({
        title: "Something Went Wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          title: "Google Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Google auth error:", err);
      toast({
        title: "Something Went Wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSignUp = mode === "signup";
  const isForgot = mode === "forgot";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1526] to-[#0a0f1a] flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[800px] h-[800px] -top-[400px] -right-[200px] rounded-full blur-[150px] opacity-20 bg-gradient-to-br from-primary/60 to-cyan-500/40" />
        <div className="absolute w-[600px] h-[600px] -bottom-[300px] -left-[200px] rounded-full blur-[150px] opacity-15 bg-gradient-to-tr from-cyan-500/50 to-primary/30" />
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link to="/" className="inline-block">
          <img src={logoLight} alt="U-topia" className="h-8 md:h-10" />
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Referral badge */}
          {referralCode && isSignUp && (
            <div className="mb-6 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center">
              <p className="text-sm text-primary">
                🎉 You were referred! Your referral code: <strong>{referralCode}</strong>
              </p>
            </div>
          )}

          {/* Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Forgot Password View */}
            {isForgot ? (
              <>
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </button>

                {/* Title */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 transition-all group disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                {/* Toggle */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    disabled={isLoading}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      isSignUp
                        ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    disabled={isLoading}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      !isSignUp
                        ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {isSignUp ? "Create Your Account" : "Welcome Back"}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {isSignUp
                      ? "Join the U-topia Affiliate Program"
                      : "Sign in to access your dashboard"}
                  </p>
                </div>

                {/* Google Sign In Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-6 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl transition-all mb-6 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSignUp && (
                    <>
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300 text-sm font-medium">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300 text-sm font-medium">
                          Title / Role
                        </Label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Marketing Manager"
                            value={formData.title}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Mobile/Telegram */}
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-gray-300 text-sm font-medium">
                          Mobile / Telegram
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="mobile"
                            name="mobile"
                            type="text"
                            placeholder="+1 234 567 8900 or @username"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="pl-12 pr-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password - Sign In only */}
                  {!isSignUp && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 transition-all group disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isSignUp ? "Create Account" : "Sign In"}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Terms - Sign Up only */}
                {isSignUp && (
                  <p className="mt-6 text-center text-xs text-gray-500">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
