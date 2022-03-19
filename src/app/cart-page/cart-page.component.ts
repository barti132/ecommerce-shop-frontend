import {Component, OnInit} from '@angular/core';
import {Cart} from "../models/cart.model";
import {CartService} from "../services/cart.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";
import {UserData} from "../models/userData.model";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{

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

  constructor(private cartService: CartService, private toastr: ToastrService, private userService: UserService, private titleService: Title){
    this.titleService.setTitle("Ecommerce | Cart page");
  }

  ngOnInit(): void{
    this.loadCartData();
  }

  private loadCartData(): void{
    this.cartService.getCartData().subscribe({
      next: (cart) => {
        this.cart = cart;
      }
    });
  }

  deleteCartItem(id: number): void{
    this.cartService.deleteCartItem(id).subscribe({
      next: () => {
        this.loadCartData()
      }, error: () => {
        this.toastr.error("Error")
      }
    });
  }

  clearCart(): void{
    this.cartService.deleteAllCart().subscribe({
      next: () => {
        this.loadCartData()
      }, error: () => {
        this.toastr.error("Error")
      }
    });
  }

  changeBuyStatus(): void{
    this.buyStatus = !this.buyStatus;
    if(this.userData.login === "" && this.buyStatus){
      this.loadUserData();
    }
  }

  loadUserData(): void{
    this.userService.getDataAboutCurrentUser().subscribe(userData => this.userData = userData);
  }

  createOrder(form: NgForm): void{
    this.cartService.createOrder(form).subscribe({
      next: (res) => {
        const fileURL = URL.createObjectURL(new Blob([res], {type: 'application/pdf'}));
        window.open(fileURL, '_blank');

        this.cart.totalItems = 0;
        this.changeBuyStatus();
      },
      error: (err) => {
        this.toastr.error("Error");
        console.log(err)
      }
    });
  }

}
