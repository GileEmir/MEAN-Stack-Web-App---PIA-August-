import { Component, OnInit } from '@angular/core';
import { GardenSchedule } from 'src/app/models/GardenSchedule';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { GardenSchedulingService } from 'src/app/services/garden-scheduling.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-owner-appointments',
  templateUrl: './owner-appointments.component.html',
  styleUrls: ['./owner-appointments.component.css']
})
export class OwnerAppointmentsComponent implements OnInit {

  currentAppointments: GardenSchedule[] = [];
  pastAppointments: GardenSchedule[] = [];
  selectedAppointment: GardenSchedule | null = null;
  myRating: number = 0;
  myComment: string = '';
  my_user: User = new User();
  errorMessage: string = '';
  hoverRating: number = 0;

  constructor(private userService: UserService, private gardenSchedulingService: GardenSchedulingService, private companyService: CompanyService) {}

  ngOnInit() {
    this.loadUser();
    this.fetchAppointments();
  }

  fetchAppointments() {
    if (this.my_user.username) {
      this.gardenSchedulingService.getSchedulesByUser(this.my_user.username).subscribe(
        (schedules: GardenSchedule[]) => {
          this.currentAppointments = [];
          this.pastAppointments = [];

          const now = new Date();
          schedules.forEach(appointment => {
            const datePart = appointment.date.split('T')[0];
            const appointmentDate = new Date(`${datePart}T00:00:00.000Z`);
            const [hours, minutes] = appointment.time.split(':').map(Number);

            appointmentDate.setHours(hours, minutes, 0, 0);

            if (appointmentDate > now) {
              this.currentAppointments.push(appointment);
            } else {
              this.pastAppointments.push(appointment);
            }
          });

          this.pastAppointments.sort((a, b) => {
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

  cancelAppointment(appointment: GardenSchedule) {
    console.log('Attempting to cancel appointment:', appointment);
    this.gardenSchedulingService.cancelSchedule(appointment).subscribe(
      () => {
        console.log('Appointment canceled:', appointment);
        this.fetchAppointments();
      },
      (error) => {
        console.error('Failed to cancel the appointment:', error);
        this.errorMessage = 'Failed to cancel the appointment';
      }
    );
  }

  canCancelAppointment(appointment: GardenSchedule): boolean {
    const now = new Date();
    const datePart = appointment.date.split('T')[0];
    const appointmentDate = new Date(`${datePart}T00:00:00.000Z`);
    const [hours, minutes] = appointment.time.split(':').map(Number);

    appointmentDate.setUTCHours(hours, minutes, 0, 0);

    const timeDifference = appointmentDate.getTime() - now.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference >= 1;
  }

  roundToQuarter(value: number): number {
    return Math.round(value * 4) / 4;
  }

  floor(value: number): number {
    return Math.floor(value);
  }

  fractionalPart(value: number): number {
    return value - Math.floor(value);
  }

  getAppointmentDate(appointment: GardenSchedule): string {
    const datePart = appointment.date.split('T')[0];
    const appointmentDate = new Date(`${datePart}T00:00:00.000Z`);
    const [hours, minutes] = appointment.time.split(':').map(Number);

    appointmentDate.setUTCHours(hours, minutes, 0, 0);

    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true, 
      timeZone: 'UTC' 
    };
    const formattedDateTime = appointmentDate.toLocaleString('en-US', options);

    return formattedDateTime;
  }

  getServices(appointment: GardenSchedule): string[] {
    return Object.keys(appointment.options).filter(option => appointment.options[option]);
  }

  openCommentForm(appointment: GardenSchedule) {
    this.selectedAppointment = appointment;
  }

  private loadUser(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.my_user = user;
    }
  }

  submitRatingAndComment(appointment: any, rating: number, comment: string): void {
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }

    const newComment = {
      user: this.my_user.username,
      comment: comment,
      date: new Date().toISOString(),
      rating: rating
    };
    
    this.companyService.updateCompanyComments(appointment.company._id, newComment)
      .subscribe(
        (companyResponse: any) => {
          alert('Company comments updated successfully');
          
          this.gardenSchedulingService.updateRated(appointment._id)
            .subscribe(
              (gardenResponse: any) => {
                alert('Appointment marked as rated successfully');
                appointment.rated = true;
              },
              (gardenError: any) => {
                console.error('Failed to mark appointment as rated:', gardenError);
                alert('Failed to mark appointment as rated');
              }
            );
        },
        (companyError: any) => {
          console.error('Failed to update company comments:', companyError);
          alert('Failed to update company comments');
        }
      );
  }
}