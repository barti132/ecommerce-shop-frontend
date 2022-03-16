import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Cart} from "../models/cart.model";
import {NgForm} from "@angular/forms";
import {environment} from "../../environments/environment";

const apiUrl = environment.address + 'cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCartData(): Observable<Cart>{
    return this.http.get<Cart>(apiUrl + this.authService.getName());
  }

  addItemToCart(id: number, amount: number): Observable<Object> {
    let cartItem = {
      "productId": id,
      "amount": amount
    }
    return this.http.post(apiUrl + this.authService.getName() + "/add-item", cartItem);
  }

  deleteCartItem(id: number): Observable<Object> {
    return this.http.delete(apiUrl + this.authService.getName() + "/cartItem/ "+ id);
  }

  deleteAllCart(): Observable<Object> {
    return this.http.delete(apiUrl + this.authService.getName() + "/all");
  }

  createOrder(form: NgForm): Observable<Blob> {
    let orderReq = {
      "addressId": form.value.address,
      "cardNumber": form.value.cardNumber,
      "cardName": form.value.cardName,
      "expiration": form.value.expiration,
      "securityCode": form.value.securityCode
    }

    return this.http.post(apiUrl + this.authService.getName() + "/make-order", orderReq, {responseType: "blob"});
  }
}
