import { Component, OnInit } from '@angular/core';
import { GardenSchedulingService } from 'src/app/services/garden-scheduling.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from '../services/company.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GardenSchedule } from '../models/GardenSchedule';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainPageComponent implements OnInit {

  owners: User [] = [];
  decors: User [] = [];
  gardenSchedules: GardenSchedule [] = [];

  statistics: any = {};
  companies: any[] = [];
  allCompanies: any[] = []; // New property to store the original list of companies
  recentJobs: any[] = [];
  searchQuery: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private gardenSchedulingService: GardenSchedulingService
  ) { }

  ngOnInit(): void {
    this.fetchStatistics();
  }

  getCompletionPhotoPath(photoPath: string): string {
    if (photoPath) {
      const index = photoPath.lastIndexOf('uploads');
      if (index !== -1) {
        const relativePath = photoPath.substring(index);
        const completionPhotoPath = `http://localhost:4000/${relativePath.replace(/\\/g, '/')}`;
        return completionPhotoPath;
      }
    }
    return '/assets/images/default_completion_photo.png'; // Default photo path
  }

  fetchStatistics(): void {
    this.userService.getAllOwners().subscribe(owners => {
      this.owners = owners;
      console.log(owners);
      this.statistics.totalRegisteredOwners = owners.length;
    });

    this.userService.getAllDecors().subscribe(decors => {
      this.decors = decors;
      console.log(decors);  
      this.statistics.totalRegisteredDecorators = decors.length;
      this.fetchCompaniesWithDecorators(); // Ensure this is called after decors are fetched
    });

    this.gardenSchedulingService.getAllSchedules().subscribe(schedules => {
      this.statistics.totalDecoratedGardens = schedules.length;
      this.gardenSchedules = schedules;
      const now = new Date();
      this.statistics.jobsLast24Hours = schedules.filter(schedule => (now.getTime() - new Date(schedule.date).getTime()) <= 24 * 60 * 60 * 1000).length;
      this.statistics.jobsLast7Days = schedules.filter(schedule => (now.getTime() - new Date(schedule.date).getTime()) <= 7 * 24 * 60 * 60 * 1000).length;
      this.statistics.jobsLast30Days = schedules.filter(schedule => (now.getTime() - new Date(schedule.date).getTime()) <= 30 * 24 * 60 * 60 * 1000).length;
    
      this.recentJobs = schedules.filter(schedule => schedule.completionPhoto).slice(-3);
    });
  }

  fetchCompaniesWithDecorators(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      this.allCompanies = companies; // Store the original list of companies
      this.companies.forEach(company => {
        company.decorators = this.decors.filter(decor => decor.companyId === company._id);
      });
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

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '▼' : '▲';
    }
    return '';
  }
}