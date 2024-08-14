import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'; // Import UserService
import { User } from '../models/User'; // Import the User model

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserDetailComponent implements OnInit {
  my_user: User= new User();
  isUserDataLoaded: boolean = false;

  updated_user: User = new User();
  selectedFile: File | null = null;
  message: string = '';

  constructor(private route: ActivatedRoute,private userService: UserService) {}

  ngOnInit(): void {
   this.loadUser();
  }

  private loadUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.userService.getUserByUsername(username).subscribe(
        data => {
          this.my_user = data;
          this.isUserDataLoaded = true;
          this.updated_user = { ...this.my_user }; // Create a shallow copy of the user object
          console.log('Loaded user:', this.my_user);
        },
        error => {
          console.error('Error fetching user details', error);
        }
      );
    } else {
      console.error('Username is null');
    }
  }

  getProfilePicPath(): string {
    if (this.my_user.profile_pic) {
      const index = this.my_user.profile_pic.lastIndexOf('uploads');
      if (index !== -1) {
        const relativePath = this.my_user.profile_pic.substring(index);
        const profilePicPath = `http://localhost:4000/${relativePath.replace(/\\/g, '/')}`;
        return profilePicPath;
      }
    }
    console.log('Default Profile Pic Path');
    return '/assets/images/auth/user_icon.png';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateUser(): void {
    if (!this.hasChanges()) {
      this.message = 'No changes detected';
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberPattern = /^[\d\s/-]+$/;
  
    // Regular expressions for different card types
    const cardPatterns = [
      { regex: /^(300|301|302|303|36|38)\d{11}$/, src: '/assets/images/card/diners-club.png' },
      { regex: /^(51|52|53|54|55)\d{14}$/, src: '/assets/images/card/mastercard.png' },
      { regex: /^(4|4556|4916|4532|4929|4485|4716)\d{12}$/, src: '/assets/images/card/visa.png' }
    ];
  
    if (this.updated_user.last_name === "") {
      this.message = "Please enter last name";
      return;
    } else if (this.updated_user.gender === "") {
      this.message = "Please select gender";
      return;
    } else if (this.updated_user.address === "") {
      this.message = "Please enter address";
      return;
    } else if (this.updated_user.phone_number === "") {
      this.message = "Please enter phone number";
      return;
    } else if (!phoneNumberPattern.test(this.updated_user.phone_number)) {
      this.message = "Please enter a valid phone number containing only digits";
      return;
    } else if (this.updated_user.email === "") {
      this.message = "Please enter email";
      return;
    } else if (!emailPattern.test(this.updated_user.email)) {
      this.message = "Please enter a valid email address";
      return;
    } else if (this.isCreditCardChanged() && this.updated_user.credit_card_number === "") {
      this.message = "Please enter credit card number";
      return;
    } else if (this.isCreditCardChanged()) {
      let validCard = false;
      for (const pattern of cardPatterns) {
        if (pattern.regex.test(this.updated_user.credit_card_number)) {
          validCard = true;
          break;
        }
      }
      if (!validCard) {
        this.message = "Please enter a valid credit card number";
        return;
      }
    }
  
    console.log('Current user:', this.my_user);
    console.log('Updated user:', this.updated_user);
  
    // Create FormData object
    const formData = new FormData();
    formData.append('username', this.updated_user.username); // Ensure username is appended
    formData.append('first_name', this.updated_user.first_name);
    formData.append('last_name', this.updated_user.last_name);
    formData.append('gender', this.updated_user.gender);
    formData.append('address', this.updated_user.address);
    formData.append('phone_number', this.updated_user.phone_number);
    formData.append('email', this.updated_user.email);
    formData.append('credit_card_number', this.updated_user.credit_card_number);
    formData.append('type', this.updated_user.type);
  
    if (this.selectedFile) {
      formData.append('profile_pic', this.selectedFile, this.selectedFile.name);
    }
  
    // Send the formData to the backend using userService
    const updateObservable = this.selectedFile
      ? this.userService.updateUserWithProfilePic(formData)
      : this.userService.updateUser(formData);
  
    updateObservable.subscribe(
      response => {
        this.message = "Log out to see the changes";






        this.loadUser(); // Refresh user data







      },
      error => {
        this.message = "Error updating user";
        console.error('Error details:', error);
      }
    );
  }
  
  isCreditCardChanged(): boolean {
    return this.my_user.credit_card_number !== this.updated_user.credit_card_number;
  }

  hasChanges(): boolean {
    return JSON.stringify(this.my_user) !== JSON.stringify(this.updated_user) || this.selectedFile !== null;
  }
}