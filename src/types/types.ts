
export interface Hangar {
  width: number;
  length: number;
  height: number;
  name: string;
}

export interface Aircraft {
  id: string;
  name: string;
  type: string;
  width: number;
  length: number;
  height: number;
  wingSpan: number;
  color: string;
}

export interface PlacedAircraft extends Aircraft {
  x: number;
  y: number;
  rotation: number;
}

export type OptimizationResult = {
  placedAircraft: PlacedAircraft[];
  unplacedAircraft: Aircraft[];
  utilizationPercentage: number;
}

export type AircraftType = {
  name: string;
  defaultWidth: number;
  defaultLength: number;
  defaultHeight: number;
  defaultWingSpan: number;
}
