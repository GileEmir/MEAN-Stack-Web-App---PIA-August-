import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-owners',
  templateUrl: './admin-owners.component.html',
  styleUrls: ['./admin-owners.component.css']
})
export class AdminOwnersComponent implements OnInit{

  owners: User[] = [];
  decors: User[] = [];

  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.getAllOwners().subscribe((data: User[]) => {
      this.owners = data;
      console.log(data);
    });

    this.userService.getAllDecors().subscribe((data: User[]) => {
      this.decors = data;
      console.log(data);
    });
  }
}
