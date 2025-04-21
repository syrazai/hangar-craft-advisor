
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Aircraft, Hangar, OptimizationResult } from "@/types/types";
import { BarChart2 } from "lucide-react";

interface OptimizationSummaryProps {
  hangar: Hangar;
  aircraft: Aircraft[];
  optimizationResult: OptimizationResult | null;
}

export default function OptimizationSummary({ 
  hangar, 
  aircraft, 
  optimizationResult 
}: OptimizationSummaryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Optimization Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Hangar Dimensions</p>
              <p className="text-lg font-semibold">
                {hangar.width}m × {hangar.length}m × {hangar.height}m
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Hangar Area</p>
              <p className="text-lg font-semibold">
                {hangar.width * hangar.length} m²
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Aircraft</p>
              <p className="text-lg font-semibold">{aircraft.length}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                {optimizationResult ? 'Aircraft Placed' : 'Ready to Optimize'}
              </p>
              <p className="text-lg font-semibold">
                {optimizationResult 
                  ? `${optimizationResult.placedAircraft.length} of ${aircraft.length}`
                  : '—'
                }
              </p>
            </div>
          </div>
          
          {optimizationResult && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Space Utilization</span>
                <span className="font-medium">{optimizationResult.utilizationPercentage}%</span>
              </div>
              <Progress value={optimizationResult.utilizationPercentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                Calculated based on the total aircraft footprint area relative to hangar floor area.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
