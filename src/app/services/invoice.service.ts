import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Invoice} from "../models/invoice.model";

const apiUrl = 'http://localhost:8080/api/v1/invoices/';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{

  constructor(private http: HttpClient, private authService: AuthService){
  }

  getUserInvoicesHistory(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(apiUrl + this.authService.getName());
  }

  getInvoicePDF(id: number): Observable<Blob> {
    return this.http.get(apiUrl + this.authService.getName() + "/id/" + id, {responseType: "blob"});
  }
}
