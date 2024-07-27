import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  message: string = "Enter your credentials to continue";
  username: string = ""; 
  password: string = "";  
  type: string = "";
  credit_card_number: string = "";
  first_name: string = "";
  last_name: string = "";
  gender: string = "";
  address: string = "";
  phone_number: string = "";
  email: string = "";
  profile_pic: string = "";
  constructor(private userService:UserService,private router:Router){}

  register(){
    if (this.username == "") {
      this.message = "Please enter username";
    }
    else if (this.password == "") {
      this.message = "Please enter password";
    }
    else if (this.first_name == "") {
      this.message = "Please enter first name";
    }
    else if (this.last_name == "") {
      this.message = "Please enter last name";
    }
    else if (this.gender == "") {
      this.message = "Please select gender";
    }
    else if (this.address == "") {
      this.message = "Please enter address";
    }
    else if (this.phone_number == "") {
      this.message = "Please enter phone number";
    }
    else if (this.email == "") {
      this.message = "Please enter email";
    }
    else if (this.profile_pic == "") {
      this.message = "Please enter profile picture URL";
    }
    else if (this.credit_card_number == "") {
      this.message = "Please enter credit card number";
    }
    else {
      // Proceed with registration or further validation
      this.message = "Looks Good"; 
    }
    // this.userService.register().subscribe((userFromDB:User)=>{
     return false;
    // })
  }
}
