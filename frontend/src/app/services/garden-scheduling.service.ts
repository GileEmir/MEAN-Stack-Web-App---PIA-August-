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

  getSchedulesByUser( username: string): Observable<GardenSchedule[]> {
    return this.http.get<GardenSchedule[]>(`${this.apiUrl}/user-schedules/${username}`);
  }

  cancelSchedule(data: GardenSchedule): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel-schedule`,data);
  }

  updateRated(appointmentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-rated`, { id: appointmentId }); 
  }
  
}