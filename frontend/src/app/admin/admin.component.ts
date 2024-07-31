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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getRequestedUsers().subscribe((data: User[]) => {
      this.users = data;
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
}