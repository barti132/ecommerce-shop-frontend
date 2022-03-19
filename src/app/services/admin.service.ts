import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDataAdmin} from "../models/userDataAdmin.model";
import {environment} from "../../environments/environment";
import {Stock} from "../models/stock.model";
import {NgForm} from "@angular/forms";

const apiUrl = environment.address + 'admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService{

  constructor(private http: HttpClient){
  }

  getUserDataForAdmin(): Observable<UserDataAdmin[]>{
    return this.http.get<UserDataAdmin[]>(apiUrl + "users");
  }

  changeUserStatus(id: number, status: boolean): Observable<Object>{
    let userStatusReq = {
      "id": id,
      "status": status
    }

    return this.http.put(apiUrl + "users/" + id + "/change-status", userStatusReq);
  }

  getStocks(): Observable<Stock[]>{
    return this.http.get<Stock[]>(apiUrl + "stock");
  }

  deleteStock(id: number): Observable<Object>{
    return this.http.delete(apiUrl + "stock/" + id);
  }

  updateAmount(id: number, amountForm: NgForm){
    let stockUpdateReq = {
      "id": id,
      "amount": amountForm.value.amount
    }
    return this.http.put(apiUrl + "stock/" + id, stockUpdateReq);
  }

  addNewProduct(productForm: NgForm, imageName: string){
    let productData = {
      "category": productForm.value.category,
      "producerName": productForm.value.producerName,
      "name": productForm.value.name,
      "priceNet": productForm.value.priceGross,
      "description": productForm.value.description,
      "imgName": imageName
    }
    return this.http.post(apiUrl + "products", productData);
  }

  uploadImage(image: File): Observable<Object>{
    const uploadData = new FormData();
    uploadData.append('image', image, image.name);
    return this.http.post(apiUrl + "image", uploadData);
  }

  updateProductData(id: number, productData: {imgName: string; producerName: string; name: string; description: string; category: string; priceNet: number}): Observable<Object>{
    return this.http.put(apiUrl + "products/" + id, productData);
  }
}
