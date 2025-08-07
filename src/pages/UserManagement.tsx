import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Key, Copy, Activity, AlertTriangle, UserCheck } from "lucide-react";

export default function UserManagement() {
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      email: "admin@company.com",
      role: "Admin",
      lastLogin: "2024-01-15 14:30",
      apiKey: "sk_live_abc123...xyz789",
      usage: { requests: 1250, limit: 5000 },
      status: "active"
    },
    {
      id: 2,
      email: "analyst1@company.com", 
      role: "Analyst",
      lastLogin: "2024-01-15 13:45",
      apiKey: "sk_live_def456...uvw012",
      usage: { requests: 890, limit: 2000 },
      status: "active"
    },
    {
      id: 3,
      email: "analyst2@company.com",
      role: "Analyst", 
      lastLogin: "2024-01-14 16:20",
      apiKey: "sk_live_ghi789...rst345",
      usage: { requests: 450, limit: 2000 },
      status: "active"
    },
    {
      id: 4,
      email: "viewer@company.com",
      role: "Viewer",
      lastLogin: "2024-01-15 09:15",
      apiKey: "sk_live_jkl012...opq678",
      usage: { requests: 120, limit: 500 },
      status: "active"
    },
    {
      id: 5,
      email: "intern@company.com",
      role: "Viewer",
      lastLogin: "2024-01-12 11:30",
      apiKey: "sk_live_mno345...lmn901",
      usage: { requests: 35, limit: 500 },
      status: "inactive"
    }
  ];

  const overviewStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRequests: users.reduce((sum, u) => sum + u.usage.requests, 0),
    rateLimitWarnings: users.filter(u => u.usage.requests / u.usage.limit > 0.8).length
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-cyber-red text-white';
      case 'Analyst': return 'bg-cyber-cyan text-cyber-black';
      case 'Viewer': return 'bg-cyber-green text-cyber-black';
      default: return 'bg-cyber-surface text-cyber-text';
    }
  };

  const getUsageColor = (used: number, limit: number) => {
    const percentage = used / limit;
    if (percentage > 0.9) return 'text-cyber-red';
    if (percentage > 0.7) return 'text-cyber-orange';
    return 'text-cyber-green';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Toast notification would be shown here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-text">User Management</h1>
          <p className="text-cyber-text-dim mt-1">Manage user roles, permissions, and API access</p>
        </div>
        
        <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
          <DialogTrigger asChild>
            <Button className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create New User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-cyber-panel border-cyber-surface">
            <DialogHeader>
              <DialogTitle className="text-cyber-text">Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div>
                <Label htmlFor="email" className="text-cyber-text-dim">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@company.com"
                  className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1"
                />
              </div>
              <div>
                <Label className="text-cyber-text-dim">Role</Label>
                <Select defaultValue="viewer">
                  <SelectTrigger className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-panel border-cyber-surface">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow">
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-cyber-cyan" />
              <div>
                <p className="text-2xl font-bold text-cyber-text">{overviewStats.totalUsers}</p>
                <p className="text-sm text-cyber-text-dim">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-cyber-green" />
              <div>
                <p className="text-2xl font-bold text-cyber-text">{overviewStats.activeUsers}</p>
                <p className="text-sm text-cyber-text-dim">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-cyber-purple" />
              <div>
                <p className="text-2xl font-bold text-cyber-text">{overviewStats.totalRequests.toLocaleString()}</p>
                <p className="text-sm text-cyber-text-dim">API Requests Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-panel">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-cyber-orange" />
              <div>
                <p className="text-2xl font-bold text-cyber-text">{overviewStats.rateLimitWarnings}</p>
                <p className="text-sm text-cyber-text-dim">Rate Limit Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="cyber-panel">
        <CardHeader>
          <CardTitle className="text-cyber-text">User Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-cyber-surface">
                <TableHead className="text-cyber-text-dim">User</TableHead>
                <TableHead className="text-cyber-text-dim">Role</TableHead>
                <TableHead className="text-cyber-text-dim">Last Login</TableHead>
                <TableHead className="text-cyber-text-dim">API Key</TableHead>
                <TableHead className="text-cyber-text-dim">Usage</TableHead>
                <TableHead className="text-cyber-text-dim">Status</TableHead>
                <TableHead className="text-cyber-text-dim">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-cyber-surface hover:bg-cyber-surface">
                  <TableCell className="text-cyber-text">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-cyber-text-dim">ID: {user.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-cyber-text text-sm">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-cyber-surface px-2 py-1 rounded text-cyber-text font-mono">
                        {user.apiKey}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(user.apiKey)}
                        className="h-6 w-6 p-0 text-cyber-text-dim hover:text-cyber-cyan"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className={getUsageColor(user.usage.requests, user.usage.limit)}>
                        {user.usage.requests.toLocaleString()}
                      </span>
                      <span className="text-cyber-text-dim"> / {user.usage.limit.toLocaleString()}</span>
                      <div className="w-20 bg-cyber-surface rounded-full h-1 mt-1">
                        <div
                          className="bg-cyber-cyan h-1 rounded-full"
                          style={{ width: `${Math.min((user.usage.requests / user.usage.limit) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-6 text-xs text-cyber-text-dim hover:text-cyber-cyan">
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 text-xs text-cyber-text-dim hover:text-cyber-cyan">
                        <Key className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card className="cyber-panel">
        <CardHeader>
          <CardTitle className="text-cyber-text flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
              <Plus className="h-4 w-4 mr-2" />
              Generate New API Key
            </Button>
            <Button variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Revoke Inactive Keys
            </Button>
          </div>
          
          <div className="text-sm text-cyber-text-dim">
            <p>• API keys provide programmatic access to the threat intelligence platform</p>
            <p>• Keys are scoped to user roles and inherit the same permissions</p>
            <p>• Monitor usage regularly and rotate keys periodically for security</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}