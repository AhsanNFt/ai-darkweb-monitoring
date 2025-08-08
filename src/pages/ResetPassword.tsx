import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", description: "Please confirm correctly.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Password updated", description: "You can now log in with your new password." });
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md cyber-panel">
        <CardHeader>
          <CardTitle className="text-cyber-text">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-cyber-text">New Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
                <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="pl-10 bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan" />
              </div>
            </div>
            <div>
              <Label htmlFor="confirm" className="text-cyber-text">Confirm Password</Label>
              <div className="relative mt-1">
                <Check className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
                <Input id="confirm" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required className="pl-10 bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan" />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow">{loading?"Saving...":"Update Password"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
