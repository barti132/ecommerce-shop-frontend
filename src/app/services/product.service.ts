import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";

const apiUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  searchProducts(category: string, product: string): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + "products/search?category=" + category + "&name=" + product);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(apiUrl + "product/" + id);
  }

  getRandomProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(apiUrl + "products/random");
  }
}
