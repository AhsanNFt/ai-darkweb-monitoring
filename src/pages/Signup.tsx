import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, User, Mail, Building, Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { emailRedirectTo: redirectUrl }
      });

      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        if (data.session) {
          toast({ title: "Welcome!", description: "Account created and signed in." });
          navigate("/");
        } else {
          toast({ title: "Check your email", description: "We sent a confirmation link to complete signup." });
          navigate("/login");
        }
      }
    } catch (error: any) {
      toast({ title: "Signup failed", description: error.message ?? "Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-black to-cyber-panel"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-cyan/10 blur-3xl animate-cyber-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-purple/10 blur-3xl animate-cyber-pulse"></div>
      </div>

      {/* Signup Card */}
      <Card className="w-full max-w-md cyber-panel cyber-glow relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-cyber-cyan" />
            <span className="text-2xl font-bold text-cyber-text">DarkSight</span>
          </div>
          <CardTitle className="text-2xl font-bold text-cyber-text">Create Account</CardTitle>
          <p className="text-cyber-text-dim">Join our cybersecurity intelligence platform</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-cyber-text flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`bg-cyber-surface border-cyber-surface text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-cyan focus:ring-cyber-cyan ${
                  errors.fullName ? "border-cyber-red" : ""
                }`}
              />
              {errors.fullName && (
                <p className="text-cyber-red text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyber-text flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`bg-cyber-surface border-cyber-surface text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-cyan focus:ring-cyber-cyan ${
                  errors.email ? "border-cyber-red" : ""
                }`}
              />
              {errors.email && (
                <p className="text-cyber-red text-sm">{errors.email}</p>
              )}
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-cyber-text flex items-center gap-2">
                <Building className="h-4 w-4" />
                Organization <span className="text-cyber-text-muted">(optional)</span>
              </Label>
              <Input
                id="organization"
                type="text"
                placeholder="Your company or organization"
                value={formData.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
                className="bg-cyber-surface border-cyber-surface text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-cyan focus:ring-cyber-cyan"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-cyber-text">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className={`bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan ${
                  errors.role ? "border-cyber-red" : ""
                }`}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-panel border-cyber-surface">
                  <SelectItem value="analyst" className="text-cyber-text hover:bg-cyber-surface focus:bg-cyber-surface">
                    Security Analyst
                  </SelectItem>
                  <SelectItem value="admin" className="text-cyber-text hover:bg-cyber-surface focus:bg-cyber-surface">
                    Administrator
                  </SelectItem>
                  <SelectItem value="viewer" className="text-cyber-text hover:bg-cyber-surface focus:bg-cyber-surface">
                    Viewer
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-cyber-red text-sm">{errors.role}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyber-text flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`bg-cyber-surface border-cyber-surface text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-cyan focus:ring-cyber-cyan pr-10 ${
                    errors.password ? "border-cyber-red" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-cyber-text-muted hover:text-cyber-cyan hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-cyber-red text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-cyber-text flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`bg-cyber-surface border-cyber-surface text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-cyan focus:ring-cyber-cyan pr-10 ${
                    errors.confirmPassword ? "border-cyber-red" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-cyber-text-muted hover:text-cyber-cyan hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-cyber-red text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow cyber-transition text-lg py-6 mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-cyber-black border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Create Account
                </div>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-cyber-text-dim">
                Already have an account?{" "}
                <Link to="/login" className="text-cyber-cyan hover:text-cyber-cyan-glow cyber-transition font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Terms */}
            <p className="text-xs text-cyber-text-muted text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="text-cyber-cyan hover:text-cyber-cyan-glow cyber-transition">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-cyber-cyan hover:text-cyber-cyan-glow cyber-transition">
                Privacy Policy
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}