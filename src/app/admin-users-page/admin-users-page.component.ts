import {Component, OnInit} from '@angular/core';
import {UserDataAdmin} from "../models/userDataAdmin.model";
import {AdminService} from "../services/admin.service";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit{

  usersData: UserDataAdmin[];

  constructor(private adminService: AdminService, private titleService: Title, private toastr: ToastrService){
    this.titleService.setTitle("Ecommerce | User management");
  }

  ngOnInit(): void{
    this.loadUserDataList()
  }

  loadUserDataList(): void {
    this.adminService.getUserDataForAdmin().subscribe((usersData) => this.usersData = usersData);
  }

  changeUserStatus(id: number, status: boolean): void{
    this.adminService.changeUserStatus(id, status).subscribe(() => {
        this.toastr.success("Success");
        this.loadUserDataList();
      },
      () => {
        this.toastr.error("Error")
      });
  }
}
