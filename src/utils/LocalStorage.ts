
import { Aircraft, Hangar } from "@/types/types";

export const saveToLocalStorage = <T,>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};

export const loadFromLocalStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return fallback;
  }
};

// Default values
export const DEFAULT_HANGAR: Hangar = {
  name: "Main Hangar",
  width: 100,
  length: 150,
  height: 20
};

export const DEFAULT_AIRCRAFT: Aircraft[] = [];
