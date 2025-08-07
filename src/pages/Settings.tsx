import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Key, 
  Webhook, 
  Activity, 
  Palette, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  TestTube,
  Save
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      weeklyReports: true,
      criticalOnly: false
    },
    api: {
      currentKey: "sk_live_abc123xyz789...",
      rateLimit: 1000,
      webhookUrl: "https://your-app.com/webhooks/threats"
    },
    integrations: {
      slackEnabled: false,
      teamsEnabled: true,
      jiraEnabled: false,
      splunkEnabled: true
    }
  });

  const systemStatus = [
    { service: "Dark Web Crawlers", status: "operational", uptime: "99.9%" },
    { service: "Threat Analysis Engine", status: "operational", uptime: "99.8%" },
    { service: "API Gateway", status: "operational", uptime: "100%" },
    { service: "Database Cluster", status: "maintenance", uptime: "99.5%" },
    { service: "Notification Service", status: "operational", uptime: "99.7%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-cyber-green text-cyber-black';
      case 'maintenance': return 'bg-cyber-orange text-cyber-black';
      case 'degraded': return 'bg-cyber-red text-white';
      default: return 'bg-cyber-surface text-cyber-text';
    }
  };

  const testWebhook = () => {
    // Simulate webhook test
    console.log("Testing webhook...");
  };

  const regenerateApiKey = () => {
    // Simulate API key regeneration
    const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15);
    setSettings(prev => ({
      ...prev,
      api: { ...prev.api, currentKey: newKey }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyber-text">Settings</h1>
        <p className="text-cyber-text-dim mt-1">Configure platform preferences and integrations</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-cyber-panel border border-cyber-surface">
          <TabsTrigger value="notifications" className="data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-black">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-black">
            <Key className="h-4 w-4 mr-2" />
            API & Auth
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-black">
            <Webhook className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-black">
            <Activity className="h-4 w-4 mr-2" />
            System Status
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-black">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-cyber-text">Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-cyber-text">Alert Notifications</Label>
                    <p className="text-sm text-cyber-text-dim">Receive emails for new threats</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailAlerts: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-cyber-text">Weekly Reports</Label>
                    <p className="text-sm text-cyber-text-dim">Summary reports every Monday</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, weeklyReports: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-cyber-text">Critical Only</Label>
                    <p className="text-sm text-cyber-text-dim">Only high/critical severity alerts</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.criticalOnly}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, criticalOnly: checked }
                      }))
                    }
                  />
                </div>

                <div className="pt-4">
                  <Label className="text-cyber-text-dim">Email Address</Label>
                  <Input 
                    defaultValue="admin@company.com"
                    className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-cyber-text">Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-cyber-text">Browser Notifications</Label>
                    <p className="text-sm text-cyber-text-dim">Real-time alerts in browser</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushNotifications: checked }
                      }))
                    }
                  />
                </div>

                <div className="p-4 bg-cyber-surface rounded-lg">
                  <p className="text-sm text-cyber-text-dim">
                    Enable browser notifications to receive real-time alerts when new threats are detected.
                    You'll need to allow notifications in your browser settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API & Authentication Tab */}
        <TabsContent value="api">
          <div className="space-y-6">
            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-cyber-text">API Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-cyber-text-dim">Current API Key</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input 
                      type="password"
                      value={settings.api.currentKey}
                      readOnly
                      className="bg-cyber-surface border-cyber-surface text-cyber-text font-mono"
                    />
                    <Button
                      variant="outline"
                      onClick={regenerateApiKey}
                      className="border-cyber-surface hover:bg-cyber-surface"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-cyber-text-dim mt-1">
                    Last regenerated: January 10, 2024
                  </p>
                </div>

                <div>
                  <Label className="text-cyber-text-dim">Rate Limit (requests/hour)</Label>
                  <Select defaultValue="1000">
                    <SelectTrigger className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-panel border-cyber-surface">
                      <SelectItem value="500">500 requests/hour</SelectItem>
                      <SelectItem value="1000">1,000 requests/hour</SelectItem>
                      <SelectItem value="2500">2,500 requests/hour</SelectItem>
                      <SelectItem value="5000">5,000 requests/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-cyber-text">Webhook Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-cyber-text-dim">Webhook URL</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input 
                      value={settings.api.webhookUrl}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        api: { ...prev.api, webhookUrl: e.target.value }
                      }))}
                      className="bg-cyber-surface border-cyber-surface text-cyber-text"
                    />
                    <Button
                      variant="outline"
                      onClick={testWebhook}
                      className="border-cyber-surface hover:bg-cyber-surface"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-cyber-text-dim">Webhook Events</Label>
                  <div className="space-y-2 mt-2">
                    {['New Threat Detected', 'Critical Alert', 'Weekly Report Ready'].map((event) => (
                      <div key={event} className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-cyber-text text-sm">{event}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { name: "Slack", enabled: settings.integrations.slackEnabled, key: "slackEnabled" },
              { name: "Microsoft Teams", enabled: settings.integrations.teamsEnabled, key: "teamsEnabled" },
              { name: "Jira", enabled: settings.integrations.jiraEnabled, key: "jiraEnabled" },
              { name: "Splunk", enabled: settings.integrations.splunkEnabled, key: "splunkEnabled" }
            ].map((integration) => (
              <Card key={integration.name} className="cyber-panel">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyber-text">{integration.name}</CardTitle>
                    <Badge className={integration.enabled ? 'bg-cyber-green text-cyber-black' : 'bg-cyber-surface text-cyber-text-dim'}>
                      {integration.enabled ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-cyber-text">Enable Integration</Label>
                    <Switch 
                      checked={integration.enabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          integrations: { ...prev.integrations, [integration.key]: checked }
                        }))
                      }
                    />
                  </div>
                  
                  {integration.enabled && (
                    <div className="space-y-2">
                      <Input 
                        placeholder={`${integration.name} webhook URL`}
                        className="bg-cyber-surface border-cyber-surface text-cyber-text"
                      />
                      <Button size="sm" variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
                        Configure
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* System Status Tab */}
        <TabsContent value="system">
          <Card className="cyber-panel">
            <CardHeader>
              <CardTitle className="text-cyber-text">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((service) => (
                  <div key={service.service} className="flex items-center justify-between p-4 bg-cyber-surface rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'operational' ? 'bg-cyber-green' :
                        service.status === 'maintenance' ? 'bg-cyber-orange' : 'bg-cyber-red'
                      }`}></div>
                      <div>
                        <p className="font-medium text-cyber-text">{service.service}</p>
                        <p className="text-sm text-cyber-text-dim">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card className="cyber-panel">
            <CardHeader>
              <CardTitle className="text-cyber-text">Theme Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-cyber-text-dim">Theme Mode</Label>
                <Select defaultValue="dark">
                  <SelectTrigger className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-panel border-cyber-surface">
                    <SelectItem value="dark">Dark (Cyber)</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-cyber-text-dim">Accent Color</Label>
                <div className="flex gap-2 mt-2">
                  {['cyber-cyan', 'cyber-green', 'cyber-purple', 'cyber-orange'].map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full bg-${color} cursor-pointer border-2 border-cyber-surface hover:scale-110 transition-transform`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}