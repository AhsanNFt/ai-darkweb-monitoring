import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, RotateCcw, Download, Filter, Maximize } from "lucide-react";

export default function GraphView() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showLegend, setShowLegend] = useState(true);

  const nodeTypes = [
    { type: "Actor", color: "bg-cyber-red", shape: "circle", count: 23 },
    { type: "Tool", color: "bg-blue-500", shape: "square", count: 45 },
    { type: "Target", color: "bg-cyber-cyan", shape: "hexagon", count: 67 },
    { type: "CVE", color: "bg-cyber-orange", shape: "triangle", count: 89 },
    { type: "Forum", color: "bg-gray-500", shape: "pentagon", count: 12 }
  ];

  const mockNodeData = {
    name: "ShadowCorp",
    type: "Actor",
    connections: 15,
    lastSeen: "2024-01-15",
    attributes: {
      "First Observed": "2023-06-10",
      "Activity Level": "High",
      "Geographic Region": "Eastern Europe",
      "Primary Targets": "Financial Institutions",
      "Known Aliases": "DarkShadow, CyberCorp"
    }
  };

  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-text">Threat Actor Network Graph</h1>
          <p className="text-cyber-text-dim mt-1">Interactive visualization of threat actor relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-cyber-surface hover:bg-cyber-surface">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="border-cyber-surface hover:bg-cyber-surface">
            <Maximize className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Graph Canvas */}
        <div className="col-span-9">
          <Card className="cyber-panel h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyber-text">Network Visualization</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-cyber-text hover:text-cyber-cyan">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyber-text hover:text-cyber-cyan">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyber-text hover:text-cyber-cyan">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyber-text hover:text-cyber-cyan">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 h-full">
              {/* Mock Graph Visualization */}
              <div className="relative h-full bg-cyber-black rounded-lg overflow-hidden">
                {/* Central Node */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyber-red rounded-full cyber-glow cursor-pointer hover:scale-110 cyber-transition flex items-center justify-center"
                  onClick={() => setSelectedNode(mockNodeData)}
                >
                  <span className="text-white font-bold text-sm">SC</span>
                </div>

                {/* Connected Nodes */}
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = (i * 360) / 12;
                  const radius = 120 + Math.random() * 60;
                  const x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 4;
                  const y = 50 + (radius * Math.sin(angle * Math.PI / 180)) / 4;
                  const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
                  
                  return (
                    <div key={i}>
                      {/* Connection Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`${x}%`}
                          y2={`${y}%`}
                          stroke="hsl(var(--cyber-cyan))"
                          strokeWidth="1"
                          opacity="0.6"
                        />
                      </svg>
                      
                      {/* Node */}
                      <div
                        className={`absolute w-8 h-8 ${nodeType.color} rounded-full cursor-pointer hover:scale-125 cyber-transition flex items-center justify-center`}
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                        onClick={() => setSelectedNode({ ...mockNodeData, name: `Node-${i}`, type: nodeType.type })}
                      >
                        <span className="text-white text-xs font-bold">{nodeType.type[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="col-span-3 space-y-4">
          {/* Legend */}
          {showLegend && (
            <Card className="cyber-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-cyber-text text-sm">Node Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nodeTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${type.color} rounded-full`}></div>
                      <span className="text-sm text-cyber-text">{type.type}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{type.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Node Details */}
          {selectedNode ? (
            <Card className="cyber-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-cyber-text text-sm">Node Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-cyber-text">{selectedNode.name}</h3>
                  <Badge className="mt-1 text-xs" variant="outline">{selectedNode.type}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-cyber-text-dim">Connections:</span>
                    <span className="text-sm text-cyber-text">{selectedNode.connections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-cyber-text-dim">Last Seen:</span>
                    <span className="text-sm text-cyber-text">{selectedNode.lastSeen}</span>
                  </div>
                </div>

                {selectedNode.attributes && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-cyber-text">Attributes</h4>
                    {Object.entries(selectedNode.attributes).map(([key, value]) => (
                      <div key={key} className="text-xs">
                        <span className="text-cyber-text-dim">{key}:</span>
                        <span className="text-cyber-text ml-1">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="cyber-panel">
              <CardContent className="p-6 text-center">
                <p className="text-cyber-text-dim text-sm">Click on a node to view details</p>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <Card className="cyber-panel">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyber-text text-sm">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Filter by Entity Type
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Adjust Layout
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Export Graph
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => setShowLegend(!showLegend)}
              >
                {showLegend ? 'Hide' : 'Show'} Legend
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}