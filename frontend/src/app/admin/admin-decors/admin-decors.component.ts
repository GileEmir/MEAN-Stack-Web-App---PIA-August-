import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-decors',
  templateUrl: './admin-decors.component.html',
  styleUrls: ['./admin-decors.component.css']
})
export class AdminDecorsComponent implements OnInit{

  decors: User[] = [];

  constructor(private userService:UserService){}
  ngOnInit(): void {

    this.userService.getAllDecors().subscribe((data: User[]) => {
      this.decors = data;
      console.log(data);
    });
  }
}