import { Component, OnInit } from '@angular/core';
import {UserData} from "../models/userData.model";
import {UserService} from "../services/user.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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

  createNewAddress = false;

  constructor(private userService: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    this.userService.getDataAboutCurrentUser().subscribe(userData => this.userData = userData);
  }

  deleteAddress(id: number) {
    this.userService.deleteAddressById(id).subscribe(
      (val) => {
        this.toastr.success("Success!");
        this.loadUserData();
      },
      (error) => {
        this.toastr.error("Deleting fail!")
      });
  }

  createNewAddressAction(){
    this.createNewAddress = !this.createNewAddress;
  }

  addNewAddress(form: NgForm){
    this.userService.addNewAddress(form).subscribe(
      (val) => {
        this.toastr.success("Success!");
        this.createNewAddress = false;
        this.loadUserData();
      },
      response => {
        console.log(response);
        this.toastr.error("Adding new address fail.");
      });
  }

  changeUserData(form: NgForm) {
    this.userService.updateUserData(form).subscribe(
      (val) => {
        this.toastr.success("Success!");
        this.userData = val;
      },
      (error) => {
        this.toastr.error("Changing fail!")
      });
  }

  changePassword(form: NgForm){
    if(form.value.password === form.value.passRep){
      this.userService.changeUserPassword(form.value.password)
        .subscribe((val) => {
            this.toastr.success("Success!");
          },
          (error) => {
            this.toastr.error("Changing fail!")
          });
    }
    else{
      this.toastr.error("Passwords don't match")
    }
  }
}
