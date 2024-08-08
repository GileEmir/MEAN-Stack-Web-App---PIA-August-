import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
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
  
  getRequestedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/get_requested_users`);
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

  updateUserWithProfilePic(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateUserWithProfilePic`, formData);
  }

  updateUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateUser`, formData);
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


  acceptUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/accept_user`, user);
  }
  
  declineUser(user: User) {
    return this.http.post(`${this.baseUrl}/decline_user`, user);
  }

  
  getUserRole(): string | null {
    const user = this.getLoggedInUser();
    return user ? user.type : null; // Using 'type' instead of 'role'
  }
  
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  
  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const payload = {
      username,
      oldPassword,
      newPassword
    };

    return this.http.post(`${this.baseUrl}/change-password`, payload);
  }
}
