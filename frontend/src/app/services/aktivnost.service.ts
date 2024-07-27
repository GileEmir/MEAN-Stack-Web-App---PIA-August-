import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aktivnosti } from '../models/Aktivnosti';
import { Prijave } from '../models/Prijave';

@Injectable({
  providedIn: 'root'
})
export class AktivnostService {

  constructor(private http:HttpClient) { }
  
  getAllPrijave(id:number){
   return this.http.post<Prijave[]>(`http://localhost:8080/users/aktivnosti/prijave`,id);
  }
}
