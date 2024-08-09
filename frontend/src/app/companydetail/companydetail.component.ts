import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './../services/company.service'; // Import CompanyService
import { Company } from '../models/Company'; // Import the Company model
import * as L from 'leaflet'; // Import Leaflet
import { GardenLayout } from '../models/GardenLayout';
import { GardenSchedulingComponent } from '../garden-scheduling/garden-scheduling.component';
import { UserService } from '../services/user.service'; // Import UserService
import { User } from '../models/User'; // Import the User model

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.css']
})
export class CompanyDetailComponent implements OnInit, AfterViewInit {
  company: Company | undefined;
  map: any;
  isCompanyDataLoaded: boolean = false;

  layout: GardenLayout | undefined;

  my_user: User = new User();
  selectedFile: File | null = null;
  message: string = '';

  @ViewChild('gardenScheduling') gardenSchedulingComponent!: GardenSchedulingComponent;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private userService: UserService, // Inject UserService
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUser();
    const companyId = this.route.snapshot.paramMap.get('id');
    if (companyId) {
      this.companyService.getCompanyById(companyId).subscribe(
        data => {
          this.company = data;
          this.isCompanyDataLoaded = true;
          this.cdr.detectChanges(); // Manually trigger change detection
          this.initializeMap(); // Initialize map after company data is loaded
        },
        error => {
          console.error('Error fetching company details', error);
        }
      );
    } else {
      console.error('Company ID is null');
    }
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    if (this.isCompanyDataLoaded && document.getElementById('map')) {
      if (this.company && this.company.location && this.company.location.coordinates) {
        if (this.map) {
          this.map.remove(); // Remove the existing map if it exists
        }
        this.map = L.map('map', {
          center: [this.company.location.coordinates[1], this.company.location.coordinates[0]],
          zoom: 13
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        L.marker([this.company.location.coordinates[1], this.company.location.coordinates[0]]).addTo(this.map)
          .bindPopup(this.company.name)
          .openPopup();
      } else {
        console.error('Company location coordinates are not available');
      }
    }
  }

  private loadUser(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.my_user = user;
      console.log('Loaded user:', this.my_user);
    } else {
      console.error('No user found');
    }
  }

  onLayoutChange(newLayout: GardenLayout): void {
    this.layout = newLayout;
  }

  submitGardenSchedule(): void {
    this.gardenSchedulingComponent.onSubmit();
  }
}