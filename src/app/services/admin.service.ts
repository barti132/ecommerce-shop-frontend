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
}
