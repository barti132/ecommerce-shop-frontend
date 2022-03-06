import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Cart} from "../models/cart.model";

const apiUrl = 'http://localhost:8080/api/v1/cart/';

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

  createOrder(address: number) {
    let orderReq = {
      "addressId": address
    }
    return this.http.post(apiUrl + this.authService.getName() + "/make-order", orderReq);
  }
}
