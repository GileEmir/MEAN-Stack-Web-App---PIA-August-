import { Component } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { User } from 'src/app/models/User';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent {

  companies: Company[] = [];
  searchQuery: string = '';
  unemployedDecors: User[] = [];
  selectedDecor: { [companyId: string]: string } = {}; // To store selected decor for each company

  constructor(private companyService: CompanyService,private userService: UserService) {}

  ngOnInit(): void {
    this.fetchCompanies();
    this.fetchUnemployedDecors();
  }
  fetchUnemployedDecors() {
    this.userService.getUnemployedDecors().subscribe((data: User[]) => {
      console.log('Fetched unemployed Decors:', data); // Debugging statement
      this.unemployedDecors = data;
    }, error => {
      console.error('Error fetching companies:', error); // Debugging statement
    });
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      console.log('Fetched companies:', companies); // Debugging statement
      this.companies = companies;
    }, error => {
      console.error('Error fetching companies:', error); // Debugging statement
    });


  }

  searchCompanies(): void {
    if (this.searchQuery) {
      this.companyService.searchCompanies(this.searchQuery).subscribe(companies => {
        console.log('Searched companies:', companies); // Debugging statement
        this.companies = companies;
      }, error => {
        console.error('Error searching companies:', error); // Debugging statement
      });
    } else {
      this.fetchCompanies();
    }
  }

  
  floor(value: number): number {
    return Math.floor(value);
  }

  ceil(value: number): number {
    return Math.ceil(value);
  }

  roundToQuarter(rating: number): number {
    return Math.round(rating * 4) / 4;
  }
  
  fractionalPart(rating: number): number {
    return rating - Math.floor(rating);
  }

  employDecor(companyId: string, decorId: string): void {
    if (decorId) {
      this.userService.employDecor(companyId, decorId).subscribe(response => {
      console.log('Employed decor:', response); // Debugging statement
      this.fetchCompanies(); // Refresh the companies list
      this.fetchUnemployedDecors(); // Refresh the unemployed decors list
      delete this.selectedDecor[companyId];
      }, error => {
      console.error('Error employing decor:', error); // Debugging statement
      });
    }
    console.log('Employing decor:', decorId + ' to company:', companyId); // Debugging statement
  }
}
