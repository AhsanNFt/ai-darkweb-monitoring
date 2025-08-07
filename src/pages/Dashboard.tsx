import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Activity, Eye, TrendingUp, Clock } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Alerts",
      value: "2,847",
      change: "+12%",
      icon: AlertTriangle,
      color: "text-cyber-red"
    },
    {
      title: "Leaked Credentials",
      value: "1,204",
      change: "+5%",
      icon: Shield,
      color: "text-cyber-orange"
    },
    {
      title: "Active Forums",
      value: "156",
      change: "+8%",
      icon: Activity,
      color: "text-cyber-cyan"
    },
    {
      title: "CVEs Detected",
      value: "89",
      change: "+15%",
      icon: Eye,
      color: "text-cyber-green"
    }
  ];

  const recentThreats = [
    {
      time: "2 min ago",
      type: "Credential Leak",
      description: "Banking credentials found on darknet market",
      severity: "critical"
    },
    {
      time: "15 min ago",
      type: "CVE Alert",
      description: "New vulnerability in WordPress plugin",
      severity: "high"
    },
    {
      time: "1 hour ago",
      type: "Actor Activity",
      description: "Known threat actor 'ShadowCorp' active",
      severity: "medium"
    },
    {
      time: "3 hours ago",
      type: "Data Breach",
      description: "Customer database exposed on forum",
      severity: "critical"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-cyber-red';
      case 'high': return 'text-cyber-orange';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-cyber-green';
      default: return 'text-cyber-text-dim';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-text">Threat Intelligence Dashboard</h1>
          <p className="text-cyber-text-dim mt-1">Monitor and analyze cybersecurity threats in real-time</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-cyber-text-dim">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="cyber-panel hover:cyber-glow cyber-transition cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyber-text-dim">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber-text">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-cyber-green" />
                <span className="text-cyber-green">{stat.change}</span>
                <span className="text-cyber-text-muted">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Activity Chart */}
        <Card className="cyber-panel">
          <CardHeader>
            <CardTitle className="text-cyber-text">Threats Detected Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-cyber-text-dim">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-2 text-cyber-cyan" />
                <p>Interactive chart would render here</p>
                <p className="text-sm">Integration with Chart.js or similar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="cyber-panel">
          <CardHeader>
            <CardTitle className="text-cyber-text">Recent Threat Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentThreats.map((threat, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-cyber-surface hover:bg-cyber-dark cyber-transition">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(threat.severity).replace('text-', 'bg-')}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-cyber-text">{threat.type}</p>
                      <span className="text-xs text-cyber-text-dim">{threat.time}</span>
                    </div>
                    <p className="text-sm text-cyber-text-dim mt-1">{threat.description}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getSeverityColor(threat.severity)} bg-opacity-20`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actor Activity Heatmap */}
      <Card className="cyber-panel">
        <CardHeader>
          <CardTitle className="text-cyber-text">Actor Activity by Day/Hour</CardTitle>
          <p className="text-sm text-cyber-text-dim">Heatmap showing threat actor activity patterns</p>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center text-cyber-text-dim">
            <div className="text-center">
              <div className="grid grid-cols-24 gap-1 mb-4">
                {Array.from({ length: 168 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.7 ? 'bg-cyber-red' :
                      Math.random() > 0.5 ? 'bg-cyber-orange' :
                      Math.random() > 0.3 ? 'bg-cyber-cyan' : 'bg-cyber-surface'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm">7-day activity heatmap</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}