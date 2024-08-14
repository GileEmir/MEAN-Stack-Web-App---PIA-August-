export class Company {
    _id: string = '';
    id: string = '';
    name: string = '';
    address: string = '';
    phone_number: string = '';
    email: string = '';
    website: string = '';
    description: string = '';
    averageRating: number = 0;
    services: string[] = [];
    contactPerson: string = '';
    pricing: string = '';
    comments: { user: string, comment: string, rating: number, date: Date }[] = [];
    location: { type: 'Point', coordinates: [number, number] } = { type: 'Point', coordinates: [0, 0] };
    annualLeaveStart: string = '';
    annualLeaveEnd: string = '';
}