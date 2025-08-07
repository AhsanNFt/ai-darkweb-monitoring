import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Search, Filter, Eye, CheckCircle, Send, Clock, Mail, Globe } from "lucide-react";

export default function AlertCenter() {
  const [selectedAlerts, setSelectedAlerts] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const alerts = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:22",
      title: "Leaked Email Detected",
      summary: "Corporate email admin@company.com found in credential dump",
      entities: ["admin@company.com", "192.168.1.1", "company-breach-2024"],
      source: "darkmarket.onion",
      severity: "critical",
      status: "open",
      timeDetected: "2 minutes ago"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:15:45",
      title: "CVE Mention Detected",
      summary: "Discussion of CVE-2024-1234 exploitation in underground forum",
      entities: ["CVE-2024-1234", "wordpress", "exploit.php"],
      source: "hackers-forum.onion",
      severity: "high",
      status: "open",
      timeDetected: "17 minutes ago"
    },
    {
      id: 3,
      timestamp: "2024-01-15 13:45:12",
      title: "Brand Mention Alert",
      summary: "Company name mentioned in malware discussion thread",
      entities: ["TechCorp", "banking-trojan", "android-malware"],
      source: "malware-dev.onion",
      severity: "medium",
      status: "open",
      timeDetected: "47 minutes ago"
    },
    {
      id: 4,
      timestamp: "2024-01-15 12:30:00",
      title: "Threat Actor Activity",
      summary: "Known threat actor 'ShadowGroup' planning new campaign",
      entities: ["ShadowGroup", "ransomware", "financial-sector"],
      source: "actor-comms.onion",
      severity: "high",
      status: "resolved",
      timeDetected: "2 hours ago"
    },
    {
      id: 5,
      timestamp: "2024-01-15 11:20:33",
      title: "Data Exposure Alert",
      summary: "Customer database file discovered on file-sharing platform",
      entities: ["customers.sql", "personal-data", "GDPR-violation"],
      source: "file-share.onion",
      severity: "critical",
      status: "open",
      timeDetected: "3 hours ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-red text-white';
      case 'high': return 'bg-cyber-orange text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-cyber-green text-white';
      default: return 'bg-cyber-surface text-cyber-text';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'resolved' ? 'text-cyber-green' : 'text-cyber-text';
  };

  const toggleAlertSelection = (alertId: number) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const openAlerts = alerts.filter(alert => alert.status === 'open').length;
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-text">Alert Center</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyber-red rounded-full animate-cyber-pulse"></div>
              <span className="text-sm text-cyber-text-dim">{openAlerts} Open Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-cyber-red" />
              <span className="text-sm text-cyber-text-dim">{criticalAlerts} Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyber-cyan" />
              <span className="text-sm text-cyber-text-dim">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className="bg-cyber-cyan text-cyber-black animate-cyber-pulse">3 New</Badge>
          <Button variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
            Bulk Actions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <div className="col-span-3">
          <Card className="cyber-panel">
            <CardHeader>
              <CardTitle className="text-cyber-text text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-cyber-text-dim mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
                  <Input 
                    placeholder="Search alerts..." 
                    className="pl-10 bg-cyber-surface border-cyber-surface text-cyber-text text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-cyber-text-dim mb-2 block">Status</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="open" defaultChecked />
                    <label htmlFor="open" className="text-sm text-cyber-text">Open ({openAlerts})</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="resolved" />
                    <label htmlFor="resolved" className="text-sm text-cyber-text">Resolved ({alerts.length - openAlerts})</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-cyber-text-dim mb-2 block">Severity</label>
                <div className="space-y-2">
                  {['critical', 'high', 'medium', 'low'].map(severity => (
                    <div key={severity} className="flex items-center space-x-2">
                      <Checkbox id={severity} defaultChecked={severity === 'critical' || severity === 'high'} />
                      <label htmlFor={severity} className="text-sm text-cyber-text capitalize">{severity}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-cyber-text-dim mb-2 block">Source</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-cyber-surface border-cyber-surface text-cyber-text">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-panel border-cyber-surface">
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="darkmarket">Dark Markets</SelectItem>
                    <SelectItem value="forums">Forums</SelectItem>
                    <SelectItem value="comms">Communications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-cyber-text-dim mb-2 block">Entity Type</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" defaultChecked />
                    <label htmlFor="email" className="text-sm text-cyber-text">Email</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ip" defaultChecked />
                    <label htmlFor="ip" className="text-sm text-cyber-text">IP Address</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cve" defaultChecked />
                    <label htmlFor="cve" className="text-sm text-cyber-text">CVE</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="domain" />
                    <label htmlFor="domain" className="text-sm text-cyber-text">Domain</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="col-span-9">
          <Card className="cyber-panel">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyber-text">Active Alerts</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-cyber-text-dim">{selectedAlerts.length} selected</span>
                  {selectedAlerts.length > 0 && (
                    <>
                      <Button size="sm" variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Resolved
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
                        <Send className="h-4 w-4 mr-1" />
                        Send to Analyst
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-b border-cyber-surface hover:bg-cyber-surface cyber-transition cursor-pointer ${
                      selectedAlerts.includes(alert.id) ? 'bg-cyber-surface' : ''
                    }`}
                    onClick={() => toggleAlertSelection(alert.id)}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox 
                        checked={selectedAlerts.includes(alert.id)}
                        onChange={() => toggleAlertSelection(alert.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                            <h3 className="font-semibold text-cyber-text">{alert.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-cyber-text-dim">{alert.timeDetected}</span>
                            <span className={`text-xs ${getStatusColor(alert.status)}`}>
                              {alert.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-cyber-text-dim mb-3">{alert.summary}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {alert.entities.map((entity, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs text-cyber-cyan border-cyber-cyan font-mono">
                                {entity}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-cyber-text-dim">
                            <div className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              <span className="font-mono">{alert.source}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-xs border-cyber-surface hover:bg-cyber-surface">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs border-cyber-surface hover:bg-cyber-surface">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark as Resolved
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs border-cyber-surface hover:bg-cyber-surface">
                            <Send className="h-3 w-3 mr-1" />
                            Send to Analyst
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}