import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, ExternalLink, Calendar, Tag, List, Grid } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export default function ThreatExplorer() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedThreat, setSelectedThreat] = useState<any>(null);

  const threats = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Credential Dump",
      summary: "Banking credentials from major EU bank found on darknet marketplace",
      source: "darkmarket.onion",
      severity: "critical",
      tags: ["banking", "credentials", "europe"],
      entities: ["admin@bank.com", "CVE-2024-1234", "192.168.1.1"],
      description: "Large-scale credential dump containing over 50,000 banking credentials discovered on prominent darknet marketplace. Credentials appear to be from a recent breach of a major European banking institution.",
    },
    {
      id: 2,
      date: "2024-01-14",
      type: "Exploit Discussion",
      summary: "New zero-day exploit for popular CMS discussed in underground forum",
      source: "hackers-den.onion",
      severity: "high",
      tags: ["zero-day", "cms", "exploit"],
      entities: ["CVE-2024-5678", "wordpress", "exploit.php"],
      description: "Underground forum discussion reveals details about a previously unknown vulnerability in WordPress that allows for remote code execution.",
    },
    {
      id: 3,
      date: "2024-01-13",
      type: "Malware Analysis",
      summary: "New banking trojan variant targeting mobile applications",
      source: "malware-lab.onion",
      severity: "high",
      tags: ["malware", "banking", "mobile"],
      entities: ["BankBot-v3", "android", "com.malware.bankbot"],
      description: "Analysis of a new banking trojan variant specifically designed to target mobile banking applications on Android devices.",
    },
    {
      id: 4,
      date: "2024-01-12",
      type: "Data Breach",
      summary: "Healthcare provider database exposed on hacker forum",
      source: "data-leaks.onion",
      severity: "critical",
      tags: ["healthcare", "pii", "breach"],
      entities: ["patient-db.sql", "healthcorp.com", "SSN-12345"],
      description: "Medical records and personal information of over 100,000 patients from a healthcare provider found being sold on darknet forums.",
    },
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

  const ThreatCard = ({ threat }: { threat: any }) => (
    <Card className="cyber-panel hover:cyber-glow cyber-transition cursor-pointer" onClick={() => setSelectedThreat(threat)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getSeverityColor(threat.severity)}>{threat.severity}</Badge>
            <Badge variant="outline" className="text-cyber-cyan border-cyber-cyan">{threat.type}</Badge>
          </div>
          <span className="text-xs text-cyber-text-dim">{threat.date}</span>
        </div>
        <CardTitle className="text-cyber-text text-lg">{threat.summary}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-3">
          <ExternalLink className="h-4 w-4 text-cyber-text-dim" />
          <span className="text-sm text-cyber-text-dim font-mono">{threat.source}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {threat.tags.map((tag: string, idx: number) => (
            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyber-text">Threat Intelligence Explorer</h1>
        <p className="text-cyber-text-dim mt-1">Browse and analyze structured threat intelligence data</p>
      </div>

      {/* Filters */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
                <Input 
                  placeholder="Search by keyword, CVE, or domain..." 
                  className="pl-10 bg-cyber-surface border-cyber-surface text-cyber-text"
                />
              </div>
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-cyber-surface border-cyber-surface text-cyber-text">
                <SelectValue placeholder="Threat Type" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-panel border-cyber-surface">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credential">Credential Dump</SelectItem>
                <SelectItem value="exploit">Exploit Discussion</SelectItem>
                <SelectItem value="malware">Malware Analysis</SelectItem>
                <SelectItem value="breach">Data Breach</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-cyber-surface border-cyber-surface text-cyber-text">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-panel border-cyber-surface">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>

            <div className="flex items-center border border-cyber-surface rounded-lg">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-r-none"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threat List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}>
        {threats.map((threat) => (
          <ThreatCard key={threat.id} threat={threat} />
        ))}
      </div>

      {/* Threat Details Drawer */}
      {selectedThreat && (
        <Drawer open={!!selectedThreat} onOpenChange={() => setSelectedThreat(null)}>
          <DrawerContent className="bg-cyber-panel border-cyber-surface">
            <DrawerHeader>
              <DrawerTitle className="text-cyber-text">{selectedThreat.summary}</DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-cyber-text-dim">Severity</label>
                  <Badge className={`${getSeverityColor(selectedThreat.severity)} mt-1`}>
                    {selectedThreat.severity}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-cyber-text-dim">Type</label>
                  <p className="text-cyber-text mt-1">{selectedThreat.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-cyber-text-dim">Date</label>
                  <p className="text-cyber-text mt-1">{selectedThreat.date}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-cyber-text-dim">Description</label>
                <p className="text-cyber-text mt-2">{selectedThreat.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-cyber-text-dim">Extracted Entities</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedThreat.entities.map((entity: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-cyber-cyan border-cyber-cyan font-mono">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-cyber-text-dim">Source</label>
                <div className="flex items-center gap-2 mt-2">
                  <ExternalLink className="h-4 w-4 text-cyber-text-dim" />
                  <span className="text-cyber-text font-mono">{selectedThreat.source}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-cyber-text-dim">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedThreat.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}