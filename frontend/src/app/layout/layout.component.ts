// layout.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  my_user: User = new User();

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = this.userService.getLoggedInUser();
    if (user) {
      this.my_user = user;
    }
  }
}