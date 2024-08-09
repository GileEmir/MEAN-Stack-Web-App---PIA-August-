export interface Company {
    _id: string;
    id: string;
    name: string;
    address: string;
    phone_number: string;
    email: string;
    website: string;
    logo: string;
    description: string;
    averageRating: number;
    owner: string; // Assuming owner is a string representing the ObjectId
    services: string[];
    pricing: string; // Assuming pricing is a string
    comments: { user: string, comment: string, rating: number, date: Date }[];
    location: { type: 'Point', coordinates: [number, number] };
}