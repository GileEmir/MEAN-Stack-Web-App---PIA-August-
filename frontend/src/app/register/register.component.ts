import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  profile_pic: File | null = null; // Change to File type
  profilePicPreview: string | ArrayBuffer | null = null;
  defaultProfilePic: string = '/assets/images/auth/default_profile_pic.jpg';

  all_user_names: string[] = [];

  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.profilePicPreview = this.defaultProfilePic;
    
    fetch(this.defaultProfilePic)
      .then(res => res.blob())
      .then(blob => {
        this.profile_pic = new File([blob], "defaultProfilePic.png", { type: blob.type });
      })
      .catch(error => console.error('Error fetching default profile picture:', error));

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profile_pic = file; // Store the selected file
      const fileType = file.type;
      const fileSize = file.size;
      const img = new Image();

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if ((fileType === 'image/jpeg' || fileType === 'image/png') &&
            width >= 100 && width <= 300 &&
            height >= 100 && height <= 300) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              this.profilePicPreview = e.target.result;
            }
          };
          reader.readAsDataURL(file);
        } else {
          alert('Invalid image. Please upload an image in JPG/PNG format with dimensions between 100x100 and 300x300 pixels.');
          this.profilePicPreview = this.defaultProfilePic;
        }
      };

      img.src = URL.createObjectURL(file);
    } else {
      this.profilePicPreview = this.defaultProfilePic;
    }
  }

  register() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if (this.username == "") {
      this.message = "Please enter username";
    } else if (this.all_user_names.includes(this.username)) {
      this.message = "Username already exists. Please enter a different username";
    } else if (this.password == "") {
      this.message = "Please enter password";
    } else if (!passwordPattern.test(this.password)) {
      this.message = "Password must be 6-10 characters long, start with a letter, and include at least one uppercase letter, three lowercase letters, one number, and one special character.";
      return;
    } else if (this.first_name == "") {
      this.message = "Please enter first name";
    } else if (this.last_name == "") {
      this.message = "Please enter last name";
    } else if (this.gender == "") {
      this.message = "Please select gender";
    } else if (this.address == "") {
      this.message = "Please enter address";
    } else if (this.phone_number == "") {
      this.message = "Please enter phone number";
    } else if (this.email == "") {
      this.message = "Please enter email";
    } else if (this.profile_pic == null) {
      this.message = "Please select a profile picture";
    } else if (this.credit_card_number == "") {
      this.message = "Please enter credit card number";
    } else {
      // Create FormData object
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('first_name', this.first_name);
      formData.append('last_name', this.last_name);
      formData.append('gender', this.gender);
      formData.append('address', this.address);
      formData.append('phone_number', this.phone_number);
      formData.append('email', this.email);
      if (this.profile_pic && this.profile_pic.name !== 'defaultProfilePic.png') {
        formData.append('profile_pic', this.profile_pic); // Append the file only if it's not the default
      }
      formData.append('credit_card_number', this.credit_card_number);
      formData.append('type', this.type); // Append the type

      // Call the backend API to register the user
      this.userService.register(formData).subscribe(
        (response) => {
          this.message = "Registration successful!";
          this.router.navigate(['/login']);
        },
        (error) => {
          this.message = "Registration failed. Please try again.";
          console.error(error);
        }
      );
    }
    return false;  
  }

  validateCard(event: any) {
    const cardNumber = event.target.value;
    const cardIcon = document.getElementById('cardIcon') as HTMLImageElement;

    // Regular expressions for different card types
    const cardPatterns = [
      { regex: /^(300|301|302|303|36|38)\d{11}$/, src: '/assets/images/card/diners-club.png' },
      { regex: /^(51|52|53|54|55)\d{14}$/, src: '/assets/images/card/mastercard.png' },
      { regex: /^( |4556|4916|4532|4929|4485|4716)\d{12}$/, src: '/assets/images/card/visa.png' }
    ];

    // Find the matching card pattern
    const matchedPattern = cardPatterns.find(pattern => pattern.regex.test(cardNumber));

    // Update the card icon if a pattern is matched
    if (matchedPattern) {
      if (cardIcon.src !== matchedPattern.src) {
        cardIcon.src = matchedPattern.src;
        cardIcon.style.display = 'inline';
      }
    } else {
      cardIcon.style.display = 'none';
    }
  }
}