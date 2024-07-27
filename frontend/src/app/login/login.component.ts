import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string="Enter your credentials to continue";
  username: string=""; 
  password: string="";  
  type: string="";
  constructor(private userService:UserService,private router:Router){}

  login(){
    if (this.username === "") {
      this.message = "Please enter username";
      return;
    } else if (this.password === "") {
      this.message = "Please enter password";
      return;
    }
    this.userService.login(this.username, this.password).subscribe((userFromDB: User) => {
      if (userFromDB) {
        if (userFromDB.type === "owner") {
          localStorage.setItem('logg', JSON.stringify(userFromDB));
          this.message = "Enter your credentials to continue";
          this.router.navigate(['/owner']);
        } else if (userFromDB.type === "decor") {
          localStorage.setItem('logg', JSON.stringify(userFromDB));
          this.message = "Enter your credentials to continue";
          this.router.navigate(['/decor']);
        }
      } else {
        this.message = "Invalid credentials. Please try again.";
      }
    }, error => {
      this.message = "An error occurred. Please try again.";
    });
    return false;
  }
  
}
