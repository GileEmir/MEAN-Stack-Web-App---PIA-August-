import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-owner-companies',
  templateUrl: './owner-companies.component.html',
  styleUrls: ['./owner-companies.component.css']
})
export class OwnerCompaniesComponent implements OnInit {
  companies: any[] = [];
  searchQuery: string = '';
  allCompanies: any[] = [];
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      console.log('Fetched companies:', companies); // Debugging statement
      this.companies = companies;
      this.allCompanies = companies; 
    }, error => {
      console.error('Error fetching companies:', error); // Debugging statement
    });
  }

  searchCompanies(): void {
    const query = this.searchQuery.toLowerCase();
    this.companies = this.allCompanies.filter(company =>
      company.name.toLowerCase().includes(query) ||
      company.address.toLowerCase().includes(query)
    );
  }

  sortCompanies(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.companies.sort((a, b) => {
      const valueA = a[column].toLowerCase();
      const valueB = b[column].toLowerCase();

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
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

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '▼' : '▲';
    }
    return '';
  }
}