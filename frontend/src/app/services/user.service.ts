import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Aktivnosti } from '../models/Aktivnosti';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:4000/users';

  login(korisnicko_ime:string,lozinka:string){
    const d ={
      username:korisnicko_ime,
      password:lozinka
    }
    return this.http.post<User>(`${this.baseUrl}/login`,d);
  }

  getAllUsernames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/get_all_usernames`);
  }

  admin_login(korisnicko_ime:string,lozinka:string){
    const d ={
      username:korisnicko_ime,
      password:lozinka
    }
    return this.http.post<User>(`${this.baseUrl}/admin_login`,d);
  }

  
  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('logg', JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem('logg');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('logg') !== null;
  }

  logout(): void {
    localStorage.removeItem('logg');
  }

}
