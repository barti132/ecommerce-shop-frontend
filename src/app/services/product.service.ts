import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {Stock} from "../models/stock.model";

const apiUrl = 'http://localhost:8080/api/v1/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  searchProducts(category: string, product: string): Observable<Product[]> {
    if (category === "any") {
      return this.http.get<Product[]>(apiUrl + "search?name=" + product);
    }
    return this.http.get<Product[]>(apiUrl + "search?name=" + product + "&category=" + category);
  }

  getProductStock(id: number): Observable<Stock> {
    return this.http.get<Stock>(apiUrl + id + "/stock");
  }

  searchProductsFilters(category: string, product: string, producer: string, price: string): Observable<Product[]> {
    let searchQuery = "?name=" + product;
    if (category !== "any") {
      searchQuery += "&category=" + category;
    }
    if (producer !== "") {
      searchQuery += "&producer=" + producer;
    }
    if (price !== "") {
      let arr = price.split(",");
      searchQuery += "&lowerPrice=" + arr[0] + "&upperPrice=" + arr[1];
    }

    return this.http.get<Product[]>(apiUrl + "search" + searchQuery);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(apiUrl + id);
  }

  getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + "random");
  }

  getProductByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + "search?category=" + category);
  }

  getProductsByCategoryFilter(category: string, producerName: string, price: string): Observable<Product[]> {
    let searchQuery = "?category=" + category;
    if (producerName !== "") {
      searchQuery += "&producer=" + producerName;
    }
    if (price !== "") {
      let arr = price.split(",");
      searchQuery += "&lowerPrice=" + arr[0] + "&upperPrice=" + arr[1];
    }

    return this.http.get<Product[]>(apiUrl + "search" + searchQuery);
  }

  getProductsProducers(category: string): Observable<String[]> {
    return this.http.get<String[]>(apiUrl + category + "/producers");
  }
}
