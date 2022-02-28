import { Component, OnInit } from '@angular/core';
import {UserData} from "../models/userData.model";
import {UserService} from "../services/user.service";
import {Address} from "../models/address.model";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userData: UserData = {
    name: "",
    lastName: "",
    email: "",
    login: "",
    phoneNumber: "",
    addresses: []
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDataAboutCurrentUser().subscribe(userData => this.userData = userData);

  }

  deleteAddress(id: number) {

  }

}
