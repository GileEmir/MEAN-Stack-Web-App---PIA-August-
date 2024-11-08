import { Company } from './../models/Company';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:4000/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }

  updateCompany(id: string, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, company);
  }

  searchCompanies(query: string): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}?search=${query}`);
  }

  updateCompanyComments($oid: any, newComment: { user: string; comment: string; date: string; rating: number; }): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl}/${$oid}/comments`, newComment);
  }

  registerCompany(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}