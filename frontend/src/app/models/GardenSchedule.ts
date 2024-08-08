import { GardenLayout } from "./GardenLayout";

export interface GardenSchedule {
  date: string; // Use string to store date in 'YYYY-MM-DD' format
  time: string; // Use string to store time in 'HH:mm' format
  totalArea: number;
  gardenType: 'private' | 'restaurant';
  poolArea?: number;
  greenArea?: number;
  furnitureArea?: number;
  fountainArea?: number;
  tables?: number;
  chairs?: number;
  description?: string;
  options: { [key: string]: boolean }; 
  layout?: GardenLayout; 
}