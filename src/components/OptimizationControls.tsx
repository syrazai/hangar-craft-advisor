
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoTooltip from "@/components/InfoTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Aircraft, Hangar, OptimizationResult } from "@/types/types";
import { optimizeAircraftPlacement } from "@/utils/optimizationAlgorithm";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface OptimizationControlsProps {
  hangar: Hangar;
  aircraft: Aircraft[];
  onOptimizationResult: (result: OptimizationResult) => void;
}

export default function OptimizationControls({ 
  hangar, 
  aircraft, 
  onOptimizationResult 
}: OptimizationControlsProps) {
  const [safetyMargin, setSafetyMargin] = useState(2);
  
  const runOptimization = () => {
    if (aircraft.length === 0) {
      alert("Please add at least one aircraft to optimize placement.");
      return;
    }
    
    const result = optimizeAircraftPlacement(hangar, aircraft, safetyMargin);
    onOptimizationResult(result);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ArrowDownUp className="w-5 h-5" />
          Optimization Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="safetyMargin" className="flex items-center">
                Safety Margin (meters)
                <InfoTooltip text="Minimum clearance space between aircraft and between aircraft and hangar walls." />
              </Label>
              <span className="text-sm font-medium">{safetyMargin}m</span>
            </div>
            <Slider
              id="safetyMargin"
              min={0}
              max={10}
              step={0.5}
              value={[safetyMargin]}
              onValueChange={([value]) => setSafetyMargin(value)}
            />
            <p className="text-xs text-gray-500">
              Minimum distance between aircraft and hangar walls.
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Ready to optimize</p>
              <p className="text-xs text-gray-500">{aircraft.length} aircraft in inventory</p>
            </div>
            <Button 
              onClick={runOptimization} 
              disabled={aircraft.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Optimization
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
