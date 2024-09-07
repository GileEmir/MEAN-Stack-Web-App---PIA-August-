import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-admin-add-company',
  templateUrl: './admin-add-company.component.html',
  styleUrls: ['./admin-add-company.component.css']
})
export class AdminAddCompanyComponent implements OnInit, AfterViewInit {
  companyName: string = "";
  companyAddress: string = "";
  services: string = "";
  priceList: string = "";
  mapLocation: string = "";
  contactPerson: string = "";
  vacationPeriod: string = "";
  annualLeaveStart: Date = new Date();
  annualLeaveEnd: Date = new Date();
  message: string = "";
  map: any;
  marker: any;
  phoneNumber: string = "";
  email: string  =  "";
  website: string = "";
  description: string = "";
  averageRating: string="";
  comments: string[]=[];

  constructor(private companyService: CompanyService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.mapLocation = `${lat},${lng}`;

      // Remove existing marker if it exists
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      // Add a new marker at the clicked location
      this.marker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup(`Location: ${lat}, ${lng}`)
        .openPopup();

      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  registerCompany() {
    console.log("registerCompany method called");

    if (this.companyName === "" || this.companyAddress === "" || this.services === "" || this.priceList === "" || this.mapLocation === "" || this.contactPerson === ""|| !this.annualLeaveStart || !this.annualLeaveEnd) {
      this.message = "Please fill in all the required fields.";
      console.log("Required fields are missing");
      return;
    }
  
    // Convert mapLocation to coordinates (assuming mapLocation is a string like "latitude,longitude")
    const [latitude, longitude] = this.mapLocation.split(',').map(coord => parseFloat(coord.trim()));
    if (isNaN(latitude) || isNaN(longitude)) {
      this.message = "Invalid map location format.";
      console.log("Invalid map location format");
      return;
    }
  
    // Split services string into an array
    const servicesArray = this.services.split(',').map(service => service.trim());
  
    const formData = new FormData();
    formData.append('name', this.companyName);
    formData.append('address', this.companyAddress);
    formData.append('phone_number', this.phoneNumber); // Add phone_number
    formData.append('email', this.email); // Add email
    formData.append('website', this.website); // Add website
    formData.append('description', this.description); // Add description
    formData.append('services', JSON.stringify(servicesArray));
    formData.append('pricing', this.priceList);
    formData.append('location', JSON.stringify({ type: 'Point', coordinates: [longitude, latitude] }));
    formData.append('contactPerson', this.contactPerson);
    formData.append('annualLeaveStart', this.annualLeaveStart.toISOString());
    formData.append('annualLeaveEnd', this.annualLeaveEnd.toISOString());
  
    // Add missing fields
    formData.append('averageRating', this.averageRating || ''); // Add averageRating
    formData.append('comments', JSON.stringify(this.comments || [])); // Add comments


    console.log("Form data prepared:", formData);
  
    this.companyService.registerCompany(formData).subscribe(
      (response) => {
        this.message = "Company registration successful!";
        console.log("Company registration successful:", response);
        this.router.navigate(['/dashboard/admin/companies']);
      },
      (error) => {
        this.message = "Company registration failed. Please try again.";
        console.error("Company registration failed:", error);
      }
    );
  }
}