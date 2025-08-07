import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Download, Mail, Save, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";

export default function ReportGenerator() {
  const [reportConfig, setReportConfig] = useState({
    title: "Weekly Threat Intelligence Report",
    timeRange: "last-7-days",
    threatTypes: [] as string[],
    includeGraphs: true,
    includeSummary: true,
    includeDetails: true,
    format: "pdf"
  });

  const threatTypes = [
    "Credential Dumps",
    "Malware Analysis", 
    "CVE Discussions",
    "Data Breaches",
    "Threat Actor Activity",
    "Brand Mentions"
  ];

  const mockChartData = [
    { name: "Credential Dumps", value: 45, color: "bg-cyber-red" },
    { name: "CVE Discussions", value: 32, color: "bg-cyber-orange" },
    { name: "Malware Analysis", value: 28, color: "bg-cyber-cyan" },
    { name: "Data Breaches", value: 18, color: "bg-cyber-purple" },
    { name: "Brand Mentions", value: 15, color: "bg-cyber-green" },
  ];

  const handleThreatTypeChange = (type: string, checked: boolean) => {
    setReportConfig(prev => ({
      ...prev,
      threatTypes: checked 
        ? [...prev.threatTypes, type]
        : prev.threatTypes.filter(t => t !== type)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyber-text">Threat Report Generator</h1>
        <p className="text-cyber-text-dim mt-1">Generate comprehensive PDF reports for threat intelligence analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Form */}
        <div className="space-y-6">
          <Card className="cyber-panel">
            <CardHeader>
              <CardTitle className="text-cyber-text">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-cyber-text-dim">Report Title</Label>
                <Input
                  id="title"
                  value={reportConfig.title}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1"
                />
              </div>

              <div>
                <Label className="text-cyber-text-dim">Time Range</Label>
                <Select 
                  value={reportConfig.timeRange} 
                  onValueChange={(value) => setReportConfig(prev => ({ ...prev, timeRange: value }))}
                >
                  <SelectTrigger className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-panel border-cyber-surface">
                    <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reportConfig.timeRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-cyber-text-dim">Start Date</Label>
                    <Button variant="outline" className="w-full justify-start text-left border-cyber-surface hover:bg-cyber-surface mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Select Date
                    </Button>
                  </div>
                  <div>
                    <Label className="text-cyber-text-dim">End Date</Label>
                    <Button variant="outline" className="w-full justify-start text-left border-cyber-surface hover:bg-cyber-surface mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Select Date
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-cyber-text-dim mb-2 block">Threat Types to Include</Label>
                <div className="space-y-2">
                  {threatTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={reportConfig.threatTypes.includes(type)}
                        onCheckedChange={(checked) => handleThreatTypeChange(type, checked as boolean)}
                      />
                      <Label htmlFor={type} className="text-cyber-text text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-cyber-text-dim">Keywords/Domains (Optional)</Label>
                <Textarea
                  placeholder="Enter specific keywords, domains, or CVEs to focus on..."
                  className="bg-cyber-surface border-cyber-surface text-cyber-text mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-panel">
            <CardHeader>
              <CardTitle className="text-cyber-text">Report Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={reportConfig.includeSummary}
                    onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeSummary: checked as boolean }))}
                  />
                  <Label htmlFor="summary" className="text-cyber-text">Include Executive Summary</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="graphs"
                    checked={reportConfig.includeGraphs}
                    onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeGraphs: checked as boolean }))}
                  />
                  <Label htmlFor="graphs" className="text-cyber-text">Include Charts & Graphs</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="details"
                    checked={reportConfig.includeDetails}
                    onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeDetails: checked as boolean }))}
                  />
                  <Label htmlFor="details" className="text-cyber-text">Include Detailed Findings</Label>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow">
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF Report
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
                    <Mail className="h-4 w-4 mr-2" />
                    Send to Email
                  </Button>
                  <Button variant="outline" className="border-cyber-surface hover:bg-cyber-surface">
                    <Save className="h-4 w-4 mr-2" />
                    Save to History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div>
          <Card className="cyber-panel">
            <CardHeader>
              <CardTitle className="text-cyber-text flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 p-4 bg-white text-black rounded-lg">
                {/* Report Header */}
                <div className="text-center border-b border-gray-300 pb-4">
                  <h1 className="text-2xl font-bold">{reportConfig.title}</h1>
                  <p className="text-gray-600 mt-2">Generated on {new Date().toLocaleDateString()}</p>
                  <p className="text-gray-600">Time Period: {reportConfig.timeRange.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>

                {/* Executive Summary */}
                {reportConfig.includeSummary && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Executive Summary</h2>
                    <p className="text-sm text-gray-700">
                      During the reporting period, our threat intelligence systems detected {143} total threats across {reportConfig.threatTypes.length || 6} different categories. 
                      Critical threats increased by 12% compared to the previous period, with credential dumps and CVE discussions being the most prevalent.
                    </p>
                  </div>
                )}

                {/* Charts Preview */}
                {reportConfig.includeGraphs && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Threat Distribution</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Bar Chart Preview */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Threats by Type</h3>
                        <div className="space-y-1">
                          {mockChartData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-20 text-xs">{item.name.split(' ')[0]}</div>
                              <div className="flex-1 bg-gray-200 rounded">
                                <div 
                                  className="h-4 bg-blue-500 rounded"
                                  style={{ width: `${(item.value / 50) * 100}%` }}
                                ></div>
                              </div>
                              <div className="w-8 text-xs">{item.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline Preview */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Trend Analysis</h3>
                        <div className="h-24 bg-gray-100 rounded flex items-end justify-around p-2">
                          {Array.from({ length: 7 }, (_, i) => (
                            <div
                              key={i}
                              className="bg-blue-500 w-4 rounded-t"
                              style={{ height: `${Math.random() * 60 + 20}%` }}
                            ></div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Findings */}
                {reportConfig.includeDetails && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Key Findings</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>15 critical credential dumps affecting financial sector</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>8 new CVE discussions with active exploitation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>12 threat actor communications intercepted</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-2">
                  DarkSight Threat Intelligence Platform - Confidential Report
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}