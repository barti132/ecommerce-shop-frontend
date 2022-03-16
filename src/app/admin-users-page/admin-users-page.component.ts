import { Component, OnInit } from '@angular/core';
import {UserDataAdmin} from "../models/userDataAdmin.model";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {

  usersData: UserDataAdmin[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
      this.adminService.getUserDataForAdmin().subscribe((usersData) => this.usersData = usersData);
  }

}
