import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  blockedUsers: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getRequestedUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(data);
    });

    this.userService.getBlockedUsers().subscribe((data: User[]) => {
      this.blockedUsers = data;
      console.log(data);
    });
  }

  acceptUser(user: User): void {
    this.userService.acceptUser(user).subscribe(
      () => {
        console.log('User accepted:', user);
        this.userService.getRequestedUsers().subscribe((data: User[]) => {
          this.users = data;
        });
      },
      (error) => {
        console.error('Error accepting user:', error);
      }
    );
   
  }

  declineUser(user: User): void {
    this.userService.declineUser(user).subscribe(
      () => {
        console.log('User accepted:', user);
        this.userService.getRequestedUsers().subscribe((data: User[]) => {
          this.users = data;
        });
      },
      (error) => {
        console.error('Error accepting user:', error);
      }
    );

  }

  unblock(user: User): void {
    this.userService.unblock(user).subscribe(
      () => {
        console.log('User Unblocked:', user);
        this.userService.getBlockedUsers().subscribe((data: User[]) => {
          this.blockedUsers = data;
        });
      },
      (error) => {
        console.error('Error accepting user:', error);
      }
    );
  }
}