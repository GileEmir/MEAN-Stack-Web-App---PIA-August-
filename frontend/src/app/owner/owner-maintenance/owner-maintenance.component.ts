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

  fetchMaintenanceJobs() {
    // this.gardenSchedulingService.getMaintenanceJobs().subscribe(
    //   (jobs: GardenSchedule[]) => {
    //     this.maintenanceJobs = jobs;
    //   },
    //   (error) => {
    //     this.errorMessage = error;
    //   }
    // );
  }

  scheduleMaintenance(job: GardenSchedule) {
    // this.gardenSchedulingService.scheduleMaintenance(job).subscribe(
    //   () => {
    //     alert('Maintenance scheduled successfully');
    //     this.fetchCompletedJobs();
    //     this.fetchMaintenanceJobs();
    //   },
    //   (error) => {
    //     this.errorMessage = 'Failed to schedule maintenance';
    //   }
    // );
  }

  isMaintenanceDue(job: GardenSchedule): boolean {
    const now = new Date();
    const completionDate = new Date(job.date);
    const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;
    return (now.getTime() - completionDate.getTime()) > sixMonthsInMilliseconds;
  }
}