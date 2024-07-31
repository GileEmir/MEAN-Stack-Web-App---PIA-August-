import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit{

  all_user_names: string[] = [];

  passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  errorMessage: string = "Please enter your username, old and new password.";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
    this.userService.getAllUsernames().subscribe(
      (response) => {
        this.all_user_names = response; // Assign the response to the array
        console.log(this.all_user_names); // Log the filled array
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(form: NgForm) {
    const { username, oldPassword, newPassword, repeatNewPassword } = form.value;
  
    if (username === "") {
      this.errorMessage = "Please enter username";
      return;
    }
  
    if (!this.all_user_names.includes(username)) {
      this.errorMessage = "Username does not exist. Please enter a valid username";
      return;
    }
  
    if (oldPassword === "") {
      this.errorMessage = "Please enter old password";
      return;
    }
  
    if (newPassword === "") {
      this.errorMessage = "Please enter new password";
      return;
    }
  
    if (newPassword !== repeatNewPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    }
  
    if (!this.passwordPattern.test(newPassword)) {
      this.errorMessage = 'Password must be 6-10 characters long, start with a letter, and include at least one uppercase letter, three lowercase letters, one number, and one special character.';
      return;
    }
  
    this.userService.changePassword(username, oldPassword, newPassword).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}