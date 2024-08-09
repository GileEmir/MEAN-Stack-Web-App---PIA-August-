import { Company } from "./Company";
import { GardenLayout } from "./GardenLayout";
import { User } from "./User";

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
  company: Company; // Include full company information
  user: User; // Include full user information
  comment?: string; // Optional comment field
  rating?: number; // Optional rating field (1-5)
  canceled: boolean;
  rated:boolean;
}