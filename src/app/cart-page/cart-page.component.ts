import { Component, OnInit } from '@angular/core';
import {Cart} from "../models/cart.model";
import {CartItem} from "../models/cartItem.model";
import {CartService} from "../services/cart.service";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

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

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCartData();
  }

  private loadCartData(): void{
    this.cartService.getCartData().subscribe((cart) => {
      this.cart = cart;
    });
  }

  deleteCartItem(id: number): void{
    this.cartService.deleteCartItem(id).subscribe(() => {this.loadCartData()}, () => {this.toastr.error("Error")})
  }

  clearCart(): void {
    this.cartService.deleteAllCart().subscribe(() => {this.loadCartData()}, () => {this.toastr.error("Error")})
  }

}
