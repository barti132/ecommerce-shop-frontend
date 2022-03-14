import {Component, OnInit} from '@angular/core';
import {Cart} from "../models/cart.model";
import {CartService} from "../services/cart.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";
import {UserData} from "../models/userData.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart: Cart = {
    updatedDate: new Date(),
    totalPriceGross: 0,
    totalPriceNet: 0,
    totalItems: 0,
    products: []
  }

  userData: UserData = {
    name: "",
    lastName: "",
    email: "",
    login: "",
    phoneNumber: "",
    addresses: []
  };

  buyStatus = false;

  constructor(private cartService: CartService, private toastr: ToastrService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadCartData();
  }

  private loadCartData(): void {
    this.cartService.getCartData().subscribe((cart) => {
      this.cart = cart;
    });
  }

  deleteCartItem(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.loadCartData()
    }, () => {
      this.toastr.error("Error")
    })
  }

  clearCart(): void {
    this.cartService.deleteAllCart().subscribe(() => {
      this.loadCartData()
    }, () => {
      this.toastr.error("Error")
    })
  }

  changeBuyStatus(): void {
    this.buyStatus = !this.buyStatus;
    if (this.userData.login === "" && this.buyStatus) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    this.userService.getDataAboutCurrentUser().subscribe(userData => this.userData = userData);
  }

  createOrder(form: NgForm): void {
    this.cartService.createOrder(form).subscribe((res) => {

        this.loadUserData();
        this.changeBuyStatus();

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
