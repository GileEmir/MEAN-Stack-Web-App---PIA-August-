import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.css']
})
export class OwnerInfoComponent implements OnInit {

  my_user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.my_user = user;
    }
    console.log(this.my_user);
  }

  getProfilePicPath(): string {
    if (this.my_user.profile_pic) {
      // Extract the relative path by finding the last occurrence of 'uploads'
      const index = this.my_user.profile_pic.lastIndexOf('uploads');
      if (index !== -1) {
        const relativePath = this.my_user.profile_pic.substring(index);
        const profilePicPath = `localhost:4000/${relativePath.replace(/\\/g, '/')}`; // Ensure forward slashes
        console.log('Profile Pic Path:', profilePicPath);
        return profilePicPath;
      }
    }
    console.log('Default Profile Pic Path');
    return '/assets/images/auth/user_icon.png'; // Default image path
  }
}