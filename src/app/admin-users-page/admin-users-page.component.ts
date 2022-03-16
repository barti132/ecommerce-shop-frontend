import {Component, OnInit} from '@angular/core';
import {UserDataAdmin} from "../models/userDataAdmin.model";
import {AdminService} from "../services/admin.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit{

  usersData: UserDataAdmin[];

  constructor(private adminService: AdminService, private titleService: Title){
    this.titleService.setTitle("Ecommerce | User management");
  }

  ngOnInit(): void{
    this.adminService.getUserDataForAdmin().subscribe((usersData) => this.usersData = usersData);
  }

}
