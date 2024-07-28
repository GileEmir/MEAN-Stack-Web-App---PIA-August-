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

  login(korisnicko_ime:string,lozinka:string){
    const d ={
      username:korisnicko_ime,
      password:lozinka
    }
    return this.http.post<User>("http://localhost:4000/users/login",d);
  }

  admin_login(korisnicko_ime:string,lozinka:string){
    const d ={
      username:korisnicko_ime,
      password:lozinka
    }
    return this.http.post<User>("http://localhost:4000/users/admin_login",d);
  }

  
  register(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:4000/users/register", user);
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
