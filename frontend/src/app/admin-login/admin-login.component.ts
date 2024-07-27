import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  message: string = "Enter your credentials to continue";
  username: string = ""; 
  password: string = "";  
  type: string = "";

  constructor(private userService: UserService, private router: Router) {
    console.log('AdminLoginComponent constructor called');
  }

  ngOnInit(): void {
    console.log('AdminLoginComponent initialized');
  }


  login() {
    if (this.username === "") {
      this.message = "Please enter username";
      return;
    } else if (this.password === "") {
      this.message = "Please enter password";
      return;
    }
    this.userService.admin_login(this.username, this.password).subscribe((userFromDB: User) => {
      if (userFromDB) {
        if (userFromDB.type === "admin") {
          this.router.navigate(['admin']);
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
