import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      localStorage.setItem("authToken", "demo-token");
      setIsLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }, (_, i) => (
            <div
              key={i}
              className={`border border-cyber-cyan ${Math.random() > 0.8 ? 'bg-cyber-cyan' : ''}`}
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animation: Math.random() > 0.9 ? 'cyber-pulse 3s infinite' : 'none'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md cyber-panel cyber-glow relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Shield className="h-12 w-12 text-cyber-cyan" />
              <div className="absolute inset-0 h-12 w-12 text-cyber-cyan animate-cyber-pulse opacity-50">
                <Shield className="h-12 w-12" />
              </div>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-cyber-text">
              DARKSIGHT
            </CardTitle>
            <p className="text-cyber-text-dim mt-2">Threat Intelligence Dashboard</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-cyber-text-dim">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@company.com"
                    className="pl-10 bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-cyber-text-dim">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-cyber-text-muted hover:text-cyber-cyan"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow cyber-transition font-semibold py-6 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-cyber-black border-t-transparent rounded-full animate-spin"></div>
                  AUTHENTICATING...
                </div>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  LOGIN
                </>
              )}
            </Button>

            <div className="text-center">
              <Link to="/forgot-password" className="text-cyber-cyan hover:text-cyber-cyan-glow text-sm">
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-cyber-surface/50 rounded-lg border border-cyber-surface">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-cyber-green" />
              <span className="text-sm font-medium text-cyber-text">Secure Access</span>
            </div>
            <p className="text-xs text-cyber-text-dim">
              This is a restricted access system. All activities are monitored and logged.
              Unauthorized access is prohibited.
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-cyber-panel/30 rounded border border-cyber-surface">
            <p className="text-xs text-cyber-text-dim text-center">
              Demo: admin@company.com / password123
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-cyber-cyan opacity-20 rotate-45 animate-cyber-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 border border-cyber-green opacity-30 rounded-full animate-cyber-glow"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 border border-cyber-purple opacity-25 animate-cyber-pulse"></div>
    </div>
  );
}