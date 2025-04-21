
import { Aircraft, Hangar, OptimizationResult, PlacedAircraft } from "@/types/types";

/**
 * Algorithm to optimize aircraft placement in a hangar
 * Uses a 2D bin packing approach with consideration for aircraft dimensions and clearances
 */
export function optimizeAircraftPlacement(
  hangar: Hangar,
  aircraft: Aircraft[],
  safetyMargin: number = 2
): OptimizationResult {
  // Sort aircraft by area (largest first) for better optimization
  const sortedAircraft = [...aircraft].sort(
    (a, b) => (b.length * b.width) - (a.length * a.width)
  );
  
  // Create a 2D grid representation of the hangar
  // Each cell is 1 meter x 1 meter
  const grid: boolean[][] = Array(Math.floor(hangar.length))
    .fill(null)
    .map(() => Array(Math.floor(hangar.width)).fill(false));
  
  const placedAircraft: PlacedAircraft[] = [];
  const unplacedAircraft: Aircraft[] = [];
  
  // Try to place each aircraft
  for (const craft of sortedAircraft) {
    // Check if aircraft height fits in hangar
    if (craft.height > hangar.height) {
      unplacedAircraft.push(craft);
      continue;
    }
    
    // Try to find a spot for the aircraft
    let placed = false;
    
    // Try regular orientation
    for (let y = 0; y <= hangar.length - craft.length - safetyMargin * 2; y++) {
      for (let x = 0; x <= hangar.width - craft.width - safetyMargin * 2; x++) {
        if (canPlaceAircraft(grid, x, y, craft.width + safetyMargin * 2, craft.length + safetyMargin * 2)) {
          markAreaAsOccupied(grid, x, y, craft.width + safetyMargin * 2, craft.length + safetyMargin * 2);
          placedAircraft.push({
            ...craft,
            x: x + safetyMargin,
            y: y + safetyMargin,
            rotation: 0
          });
          placed = true;
          break;
        }
      }
      if (placed) break;
    }
    
    // If not placed, try rotated 90 degrees
    if (!placed && craft.width <= hangar.length - safetyMargin * 2 && craft.length <= hangar.width - safetyMargin * 2) {
      for (let y = 0; y <= hangar.length - craft.width - safetyMargin * 2; y++) {
        for (let x = 0; x <= hangar.width - craft.length - safetyMargin * 2; x++) {
          if (canPlaceAircraft(grid, x, y, craft.length + safetyMargin * 2, craft.width + safetyMargin * 2)) {
            markAreaAsOccupied(grid, x, y, craft.length + safetyMargin * 2, craft.width + safetyMargin * 2);
            placedAircraft.push({
              ...craft,
              x: x + safetyMargin,
              y: y + safetyMargin,
              rotation: 90
            });
            placed = true;
            break;
          }
        }
        if (placed) break;
      }
    }
    
    // If still not placed, add to unplaced
    if (!placed) {
      unplacedAircraft.push(craft);
    }
  }
  
  // Calculate utilization percentage
  const totalHangarArea = hangar.width * hangar.length;
  const totalOccupiedArea = placedAircraft.reduce((sum, aircraft) => {
    return sum + (aircraft.rotation === 0 ? 
      aircraft.width * aircraft.length : 
      aircraft.length * aircraft.width);
  }, 0);
  
  const utilizationPercentage = Math.round((totalOccupiedArea / totalHangarArea) * 100);
  
  return {
    placedAircraft,
    unplacedAircraft,
    utilizationPercentage
  };
}

// Helper function to check if an area is available
function canPlaceAircraft(grid: boolean[][], x: number, y: number, width: number, length: number): boolean {
  for (let dy = 0; dy < length; dy++) {
    for (let dx = 0; dx < width; dx++) {
      if (grid[y + dy][x + dx]) {
        return false;
      }
    }
  }
  return true;
}

// Helper function to mark an area as occupied
function markAreaAsOccupied(grid: boolean[][], x: number, y: number, width: number, length: number): void {
  for (let dy = 0; dy < length; dy++) {
    for (let dx = 0; dx < width; dx++) {
      grid[y + dy][x + dx] = true;
    }
  }
}
