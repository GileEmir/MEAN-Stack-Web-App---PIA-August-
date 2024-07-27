import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Aktivnosti } from '../models/Aktivnosti';

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
  
  getAllAktivnosti(){
    return this.http.get<Aktivnosti[]>(`http://localhost:8080/users/aktivnosti`);
  }

  register(){
    return 10;
  }

}
