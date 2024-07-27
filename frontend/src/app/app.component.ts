import { Component } from '@angular/core';
import { User } from './models/User';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vasa Masta-Vasa Basta';
  name="Kralju";
  allUsers: User[] = [];

  constructor(private router:Router){
    
  }
  

  message="";
  username:string="";
  password:string="";



  

  login(){
   
  }
}
