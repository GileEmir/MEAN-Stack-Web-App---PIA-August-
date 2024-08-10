import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { GardenSchedule } from '../../models/GardenSchedule';
import { GardenSchedulingService } from '../../services/garden-scheduling.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-decor-appointments',
  templateUrl: './decor-appointments.component.html',
  styleUrls: ['./decor-appointments.component.css']
})
export class DecorAppointmentsComponent implements OnInit{
  availableAppointments: GardenSchedule[] = [];
  pastAppointments: GardenSchedule[] = [];
  myAppointments: GardenSchedule[] = [];
  myRating: number = 0;
  hoverRating: number = 0;
  my_user: User = new User();

  constructor(private gardenSchedulingService: GardenSchedulingService,private userService:UserService) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadAppointments();
    this.loadMyAppointments();
    
  }
  private loadUser(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      console.log(user);
      this.my_user = user;
    }
  }
  
  loadMyAppointments() {
    this.gardenSchedulingService.getSchedulesForWorker(this.my_user.username)
      .subscribe(
        (appointments: any[]) => {
          this.myAppointments = appointments;

          this.myAppointments.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const [hoursA, minutesA] = a.time.split(':').map(Number);
            const [hoursB, minutesB] = b.time.split(':').map(Number);
            dateA.setHours(hoursA, minutesA);
            dateB.setHours(hoursB, minutesB);
            return dateB.getTime() - dateA.getTime();
          });
        },
        (error: any) => {
          console.error('Error loading my appointments', error);
        }
      );
  }
  loadAppointments(): void {
    const companyId = this.my_user.companyId; // Replace with actual company ID
    this.gardenSchedulingService.getSchedulesByCompany(companyId ?? '').subscribe(
      (appointments: GardenSchedule[]) => {
        this.availableAppointments = [];
        this.pastAppointments = [];
  
        const now = new Date();
        appointments.forEach(appointment => {
          const datePart = appointment.date.split('T')[0];
          const appointmentDate = new Date(`${datePart}T00:00:00.000Z`);
          const [hours, minutes] = appointment.time.split(':').map(Number);
  
          appointmentDate.setHours(hours, minutes, 0, 0);
  
          if (appointmentDate > now) {
            this.availableAppointments.push(appointment);
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
       
      }
    );
  }

  getAppointmentDate(appointment: GardenSchedule): string {
    return new Date(appointment.date).toLocaleDateString();
  }
  getCompletionDate(appointment: GardenSchedule): string {
    if (appointment.completionDate) {
      return new Date(appointment.completionDate).toLocaleDateString();
    }
    return '';
  }

  getServices(appointment: GardenSchedule): string {
    return `${appointment.poolArea ? 'Pool Area' : ''} ${appointment.greenArea ? 'Green Area' : ''} ${appointment.furnitureArea ? 'Furniture Area' : ''} ${appointment.fountainArea ? 'Fountain Area' : ''}`;
  }

  canCancelAppointment(appointment: GardenSchedule): boolean {
    const now = new Date();
    const appointmentDate = new Date(appointment.date);
    return appointmentDate > now;
  }
  cancelAppointment(appointment: GardenSchedule, refusalComment: string): void {
    if(refusalComment === ''){
      alert('Please provide a reason for cancelling the appointment');
      return;
    }
    const data = {
      appointment,
      comment: refusalComment,
      username : this.my_user.username
    };
  
    this.gardenSchedulingService.declineAppointment(data).subscribe(() => {
      this.loadAppointments();
      console.log(this.availableAppointments);
    });
  }

  confirmAppointment(appointment: GardenSchedule): void {
    const data = {
      appointment,
      username: this.my_user.username
    };
  
    this.gardenSchedulingService.acceptAppointment(data).subscribe(() => {
      this.loadAppointments();
      this.loadMyAppointments();
    });
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

  
  hasUserRefused(appointment: GardenSchedule, username: string): boolean {
    const hasRefused = appointment.refusedBy.some(refusal => refusal.username === username);
    return hasRefused;
  }

  finishJob(appointment: GardenSchedule): void {
    const data = {
      appointment,
      completionDate : new Date().toISOString()
    };
    this.gardenSchedulingService.finnishAppointment(data).subscribe(() => {
      this.loadMyAppointments();
    });
  }

  submitPhoto(appointment: GardenSchedule): void {
    // const file = this.selectedFiles[appointment.id];
    // if (!file) {
    //   alert('Please select a photo to upload');
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('photo', file);
    // formData.append('appointmentId', appointment.id);

    // this.gardenSchedulingService.uploadCompletionPhoto(formData).subscribe(() => {
    //   this.loadMyAppointments();
    // });
  }

  onFileSelected(event: any, appointment: GardenSchedule): void {
    // const file: File = event.target.files[0];
    // if (file) {
    //   this.selectedFiles[appointment.id] = file;
    // }
  }
}
