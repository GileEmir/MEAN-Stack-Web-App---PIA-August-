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
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if (this.username === "") {
      this.message = "Please enter username";
      return;
    } else if (this.password === "") {
      this.message = "Please enter password";
      return;
    } else if (!passwordPattern.test(this.password)) {
      this.message = "Password must be 6-10 characters long, start with a letter, and include at least one uppercase letter, three lowercase letters, one number, and one special character.";
      return;
    }
    
    this.userService.login(this.username, this.password).subscribe((userFromDB: User) => {
      if (userFromDB) {
        if (userFromDB.type === "owner") {
          localStorage.setItem('logg', JSON.stringify(userFromDB));
          this.message = "Enter your credentials to continue";
          this.router.navigate(['/dashboard/owner/info']);
        } else if (userFromDB.type === "decor") {
          localStorage.setItem('logg', JSON.stringify(userFromDB));
          this.message = "Enter your credentials to continue";
          this.router.navigate(['/dashboard/decor/info']);
        }
      } else {
        this.message = "Invalid credentials. Please try again.";
      }
    },error => {
      if (error.status === 403 && error.error.message === 'User is not active') {
        alert("Admin has not yet approved your registration");
      } else {
        this.message = "Invalid credentials. Please try again.";
      }
    });
    return false;
  }
  
}
