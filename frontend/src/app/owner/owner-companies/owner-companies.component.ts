import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-owner-companies',
  templateUrl: './owner-companies.component.html',
  styleUrls: ['./owner-companies.component.css']
})
export class OwnerCompaniesComponent implements OnInit {
  companies: Company[] = [];
  searchQuery: string = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.fetchCompanies();
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
}