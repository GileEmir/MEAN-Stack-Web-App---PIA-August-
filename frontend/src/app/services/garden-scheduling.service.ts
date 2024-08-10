import { GardenSchedule } from './../models/GardenSchedule';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GardenSchedulingService {
 

  private apiUrl = 'http://localhost:4000/garden-schedules';

  constructor(private http: HttpClient) {}

  scheduleGarden(data: GardenSchedule): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedule-garden`, data);
  }

  getAllSchedules(): Observable<GardenSchedule[]> {
    return this.http.get<GardenSchedule[]>(`${this.apiUrl}/schedules`);
  }

  getMaintenanceJobsByUser(username: string): Observable<GardenSchedule[]> {
    return this.http.get<GardenSchedule[]>(`${this.apiUrl}/user-maintenance-jobs/${username}`);
  }
  getSchedulesByUser( username: string): Observable<GardenSchedule[]> {
    return this.http.get<GardenSchedule[]>(`${this.apiUrl}/user-schedules/${username}`);
  }

  getSchedulesByCompany( companyId: string): Observable<GardenSchedule[]> {
    return this.http.get<GardenSchedule[]>(`${this.apiUrl}/company-schedules/${companyId}`);
  }

  cancelSchedule(data: GardenSchedule): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel-schedule`,data);
  }

  declineAppointment(data: { appointment: GardenSchedule; comment: string,username:string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/decline-schedule`, data);
  }

  acceptAppointment(data: { appointment: GardenSchedule; username: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/accept-schedule`, data);
  }
  updateRated(appointmentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-rated`, { id: appointmentId }); 
  }
  
  getSchedulesForWorker(username: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/worker`, { username });
  }

  finnishAppointment(data: { appointment: GardenSchedule; completionDate: string }) {
    console.log(data);
    return this.http.post<any[]>(`${this.apiUrl}/finnish-appointment`, { data });
  }
}