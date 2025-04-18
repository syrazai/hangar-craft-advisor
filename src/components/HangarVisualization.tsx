
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Aircraft, Hangar, OptimizationResult, PlacedAircraft } from "@/types/types";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

interface HangarVisualizationProps {
  hangar: Hangar;
  optimizationResult: OptimizationResult | null;
}

export default function HangarVisualization({ hangar, optimizationResult }: HangarVisualizationProps) {
  const [scale, setScale] = useState(1);
  
  // Calculate the maximum dimension to determine scaling
  const maxHangarDimension = Math.max(hangar.width, hangar.length);
  const scaleFactor = 600 / maxHangarDimension; // Max visualization width is 600px
  
  const effectiveScale = scaleFactor * scale;
  
  const hangarStyle = {
    width: `${hangar.width * effectiveScale}px`,
    height: `${hangar.length * effectiveScale}px`,
    position: 'relative' as 'relative',
    border: '2px solid #1e3a8a',
    backgroundColor: '#f1f5f9',
    overflow: 'hidden' as 'hidden'
  };
  
  const zoomIn = () => setScale(prevScale => Math.min(prevScale * 1.2, 3));
  const zoomOut = () => setScale(prevScale => Math.max(prevScale / 1.2, 0.2));
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13" />
              <path d="M2 10h20" />
            </svg>
            Hangar Visualization - {hangar.name}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={zoomOut}
              className="p-1 rounded-full hover:bg-gray-200"
              aria-label="Zoom out"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={zoomIn}
              className="p-1 rounded-full hover:bg-gray-200"
              aria-label="Zoom in"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="mb-2 text-sm text-gray-500">
            {hangar.width} x {hangar.length} meters
            {optimizationResult && (
              <span className="ml-2">
                • Utilization: {optimizationResult.utilizationPercentage}%
              </span>
            )}
          </div>
          
          <div className="border rounded-md p-4 overflow-auto max-w-full">
            <div style={hangarStyle}>
              {/* Grid lines for scale reference */}
              <div className="absolute inset-0 grid" style={{ 
                backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                backgroundSize: `${10 * effectiveScale}px ${10 * effectiveScale}px`
              }} />
              
              {/* Placed aircraft */}
              {optimizationResult?.placedAircraft.map((craft) => (
                <AircraftVisual 
                  key={craft.id}
                  aircraft={craft}
                  scale={effectiveScale}
                />
              ))}
            </div>
          </div>
          
          {optimizationResult?.unplacedAircraft.length ? (
            <div className="w-full mt-4">
              <h3 className="text-sm font-medium mb-1">
                Unable to place ({optimizationResult.unplacedAircraft.length}):
              </h3>
              <div className="text-sm text-gray-500 flex flex-wrap gap-2">
                {optimizationResult.unplacedAircraft.map(craft => (
                  <span 
                    key={craft.id}
                    className="px-2 py-1 bg-gray-100 rounded-md border"
                  >
                    {craft.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

interface AircraftVisualProps {
  aircraft: PlacedAircraft;
  scale: number;
}

function AircraftVisual({ aircraft, scale }: AircraftVisualProps) {
  const { x, y, width, length, rotation, color, name } = aircraft;
  
  // Choose dimensions based on rotation
  const visualWidth = rotation === 0 ? width * scale : length * scale;
  const visualHeight = rotation === 0 ? length * scale : width * scale;
  
  const style = {
    width: `${visualWidth}px`,
    height: `${visualHeight}px`,
    backgroundColor: color,
    position: 'absolute' as 'absolute',
    left: `${x * scale}px`,
    top: `${y * scale}px`,
    transform: rotation ? 'rotate(90deg)' : 'none',
    transformOrigin: 'top left',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isColorDark(color) ? 'white' : 'black',
    fontSize: `${Math.max(8, Math.min(12, scale * 3))}px`,
    overflow: 'hidden' as 'hidden',
    whiteSpace: 'nowrap' as 'nowrap',
    textOverflow: 'ellipsis' as 'ellipsis',
    paddingLeft: '4px',
    paddingRight: '4px',
  };
  
  return (
    <div style={style} title={`${name} (${width}m x ${length}m)`}>
      {visualWidth > 40 && visualHeight > 20 ? name : ''}
    </div>
  );
}

// Helper function to determine if a color is dark (to choose text color)
function isColorDark(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate perceived brightness using the formula:
  // (0.299 * R + 0.587 * G + 0.114 * B)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // If brightness is less than 128, the color is dark
  return brightness < 128;
}
