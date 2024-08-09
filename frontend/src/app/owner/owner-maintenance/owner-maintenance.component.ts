import { Component, OnInit } from '@angular/core';
import { GardenSchedule } from 'src/app/models/GardenSchedule';
import { User } from 'src/app/models/User';
import { CompanyService } from 'src/app/services/company.service';
import { GardenSchedulingService } from 'src/app/services/garden-scheduling.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-owner-maintenance',
  templateUrl: './owner-maintenance.component.html',
  styleUrls: ['./owner-maintenance.component.css']
})
export class OwnerMaintenanceComponent implements OnInit {

  currentAppointments: GardenSchedule[] = [];
  finnishedAppointments: GardenSchedule[] = [];
  maintenanceJobs: GardenSchedule[] = [];
  errorMessage: string = '';
  my_user: User = new User();

  maintenanceDate: Date = new Date();
  maintenanceTime: string = '';

  constructor(private userService: UserService, private gardenSchedulingService: GardenSchedulingService, private companyService: CompanyService) {}

  ngOnInit() {
    this.loadUser();
    this.fetchAppointments();
    this.fetchMaintenanceJobs();
  }
  
  private loadUser(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.my_user = user;
    }
  }

  fetchAppointments() {
    if (this.my_user.username) {
      this.gardenSchedulingService.getSchedulesByUser(this.my_user.username).subscribe(
        (schedules: GardenSchedule[]) => {
          this.currentAppointments = [];
          this.finnishedAppointments = [];

          const now = new Date();
          schedules.forEach(appointment => {
            const datePart = appointment.date.split('T')[0];
            const appointmentDate = new Date(`${datePart}T00:00:00.000Z`);
            const [hours, minutes] = appointment.time.split(':').map(Number);

            appointmentDate.setHours(hours, minutes, 0, 0);

            if (appointmentDate > now) {
              this.currentAppointments.push(appointment);
            } else {
              this.finnishedAppointments.push(appointment);
            }
          });

          this.finnishedAppointments.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const [hoursA, minutesA] = a.time.split(':').map(Number);
            const [hoursB, minutesB] = b.time.split(':').map(Number);
            dateA.setHours(hoursA, minutesA);
            dateB.setHours(hoursB, minutesB);
            return dateB.getTime() - dateA.getTime();
          });
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else {
      this.errorMessage = 'User not loaded';
    }
  }

  cancelJob(job: GardenSchedule): void {
    console.log('Attempting to cancel job:', job);
    this.gardenSchedulingService.cancelSchedule(job).subscribe(
      () => {
        console.log('Job canceled:', job);
        this.fetchMaintenanceJobs();
      },
      (error) => {
        console.error('Failed to cancel the job:', error);
        this.errorMessage = 'Failed to cancel the job';
      }
    );
  }

  canCancelJob(job: GardenSchedule): boolean {
    const now = new Date();
    const datePart = job.date.split('T')[0];
    const jobDate = new Date(`${datePart}T00:00:00.000Z`);
    const [hours, minutes] = job.time.split(':').map(Number);

    jobDate.setUTCHours(hours, minutes, 0, 0);

    const timeDifference = jobDate.getTime() - now.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference >= 1;
  }

  fetchMaintenanceJobs() {
    const username = this.my_user.username; // Replace with the actual username
    this.gardenSchedulingService.getMaintenanceJobsByUser(username).subscribe(
      (jobs: GardenSchedule[]) => {
        this.maintenanceJobs = jobs;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  scheduleMaintenance(job: GardenSchedule) {
    if (this.maintenanceDate && this.maintenanceTime) {
      // Show a confirmation dialog
      const isConfirmed = window.confirm('Are you sure you want to schedule maintenance?');
  
      if (isConfirmed) {
        // Manually adjust the date to ensure it doesn't shift due to timezone differences
        const adjustedDate = new Date(this.maintenanceDate.getTime() - this.maintenanceDate.getTimezoneOffset() * 60000);
        const formattedDate = adjustedDate.toISOString().split('T')[0]; // Convert Date to 'YYYY-MM-DD' format
        const newJob: GardenSchedule = {
          ...job,
          date: formattedDate,
          time: this.maintenanceTime,
          description: 'Maintenance'
        };
        this.gardenSchedulingService.scheduleGarden(newJob).subscribe(
          response => {
            console.log('Garden schedule submitted successfully', response);
            this.fetchAppointments();
            this.fetchMaintenanceJobs();
            alert('Garden Maintenance submitted successfully');
          },
          error => {
            this.errorMessage = 'Error submitting garden schedule. Please try again later.';
            console.error('Error submitting garden schedule', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please select a date and time for maintenance.';
    }
  }

  isMaintenanceDue(job: GardenSchedule): boolean {
    const now = new Date();
    const completionDate = new Date(job.date);
    const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
    return (now.getTime() - completionDate.getTime()) > sixMonthsInMilliseconds;
  }

  getFormattedDate(date: string, time: string): string {
    const datePart = date.split('T')[0];
    const formattedDate = new Date(`${datePart}T00:00:00.000Z`);
    const [hours, minutes] = time.split(':').map(Number);
  
    formattedDate.setUTCHours(hours, minutes, 0, 0);
  
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true, 
      timeZone: 'UTC' 
    };
    return formattedDate.toLocaleString('en-US', options);
  }
  
}