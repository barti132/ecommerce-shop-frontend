import {Component, OnInit} from '@angular/core';
import {UserData} from "../models/userData.model";
import {UserService} from "../services/user.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Invoice} from "../models/invoice.model";
import {InvoiceService} from "../services/invoice.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{

  userData: UserData = {
    name: "",
    lastName: "",
    email: "",
    login: "",
    phoneNumber: "",
    addresses: []
  };

  invoices: Invoice[];

  createNewAddress = false;

  constructor(private userService: UserService, private toastr: ToastrService, private invoiceService: InvoiceService, private titleService: Title){
    this.titleService.setTitle("Ecommerce | User page");
  }

  ngOnInit(): void{
    this.loadUserData();
  }

  loadUserData(): void{
    this.userService.getDataAboutCurrentUser().subscribe(userData => this.userData = userData);
    this.invoiceService.getUserInvoicesHistory().subscribe(invoices => this.invoices = invoices);
  }

  deleteAddress(id: number): void{
    this.userService.deleteAddressById(id).subscribe(
      () => {
        this.toastr.success("Success!");
        this.loadUserData();
      },
      () => {
        this.toastr.error("Deleting fail!")
      });
  }

  createNewAddressAction(): void{
    this.createNewAddress = !this.createNewAddress;
  }

  addNewAddress(form: NgForm): void{
    this.userService.addNewAddress(form).subscribe(
      () => {
        this.toastr.success("Success!");
        this.createNewAddress = false;
        this.loadUserData();
      },
      response => {
        console.log(response);
        this.toastr.error("Adding new address fail.");
      });
  }

  changeUserData(form: NgForm): void{
    this.userService.updateUserData(form).subscribe(
      (val) => {
        this.toastr.success("Success!");
        this.userData = val;
      },
      () => {
        this.toastr.error("Changing fail!")
      });
  }

  changePassword(form: NgForm): void{
    if(form.value.password === form.value.passRep){
      this.userService.changeUserPassword(form.value.password)
        .subscribe(() => {
            this.toastr.success("Success!");
          },
          () => {
            this.toastr.error("Changing fail!")
          });
    }else{
      this.toastr.error("Passwords don't match")
    }
  }

  getInvoicePDF(id: number): void{
    this.invoiceService.getInvoicePDF(id).subscribe((res) => {
        const fileURL = URL.createObjectURL(new Blob([res], {type: 'application/pdf'}));
        window.open(fileURL, '_blank');
        this.toastr.success("success");
      },
      (err) => {
        this.toastr.error("Error");
        console.log(err)
      });
  }
}
