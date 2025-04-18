
import { AircraftType } from "@/types/types";

// Predefined aircraft types with default dimensions
export const aircraftTypes: AircraftType[] = [
  {
    name: "Small Private Jet",
    defaultWidth: 10,
    defaultLength: 15,
    defaultHeight: 4,
    defaultWingSpan: 14
  },
  {
    name: "Medium Business Jet",
    defaultWidth: 15,
    defaultLength: 20,
    defaultHeight: 6,
    defaultWingSpan: 18
  },
  {
    name: "Regional Airliner",
    defaultWidth: 25,
    defaultLength: 35,
    defaultHeight: 8,
    defaultWingSpan: 30
  },
  {
    name: "Narrow-body Commercial",
    defaultWidth: 35,
    defaultLength: 40,
    defaultHeight: 12,
    defaultWingSpan: 36
  },
  {
    name: "Wide-body Commercial",
    defaultWidth: 45,
    defaultLength: 65,
    defaultHeight: 16,
    defaultWingSpan: 60
  },
  {
    name: "Helicopter - Small",
    defaultWidth: 8,
    defaultLength: 12,
    defaultHeight: 3,
    defaultWingSpan: 12
  },
  {
    name: "Helicopter - Large",
    defaultWidth: 12,
    defaultLength: 20,
    defaultHeight: 5,
    defaultWingSpan: 20
  },
  {
    name: "Light Propeller",
    defaultWidth: 8,
    defaultLength: 8,
    defaultHeight: 3,
    defaultWingSpan: 10
  }
];
