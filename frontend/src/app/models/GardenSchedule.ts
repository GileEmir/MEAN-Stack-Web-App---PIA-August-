import { Company } from "./Company";
import { GardenLayout } from "./GardenLayout";
import { User } from "./User";

export class GardenSchedule {
  _id: string = "";
  date: string = ""; // Use string to store date in 'YYYY-MM-DD' format
  time: string = ""; // Use string to store time in 'HH:mm' format
  totalArea: number = 0;
  gardenType: 'private' | 'restaurant' = 'private';
  poolArea?: number;
  greenArea?: number;
  furnitureArea?: number;
  fountainArea?: number;
  tables?: number;
  chairs?: number;
  description?: string;
  options: { [key: string]: boolean } = {}; // Initialize options property
  layout?: GardenLayout; 
  company: Company = new Company(); // Initialize company property
  user: User = new User(); // Initialize user property
  comment?: string; // Optional comment field
  rating?: number; // Optional rating field (1-5)
  canceled: boolean = false; // Initialize canceled property
  rated:boolean = false; // Initialize rated property
  workerId?: string | null; // Add this field
  status: 'pending' | 'accepted' | 'refused' = 'pending'; // Initialize status property
  refusedBy: { username: string; comment: string }[] = []; // Initialize refusedBy property
  completionPhoto?: string; // Add this field for the completion photo
  completionDate?: string; // Add this field for the completion date
  dateOfCompletionPhotoUpload?: string; // Add this field for the date of completion photo upload
  estimatedCompletionDate?: string; // Add this field for the estimated completion date
}