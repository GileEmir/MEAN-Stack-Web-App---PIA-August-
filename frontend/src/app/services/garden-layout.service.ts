// garden-layout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GardenLayout } from './../models/GardenLayout'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class GardenLayoutService {

  private apiUrl = 'http://localhost:4000/garden-layout'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  saveLayout(layout: GardenLayout): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, layout);
  }

  getLayout(): Observable<GardenLayout> {
    return this.http.get<GardenLayout>(`${this.apiUrl}/load`);
  }
}