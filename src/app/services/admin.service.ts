import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDataAdmin} from "../models/userDataAdmin.model";

const apiUrl = 'http://localhost:8080/api/v1/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUserDataForAdmin(): Observable<UserDataAdmin[]>{
    return this.http.get<UserDataAdmin[]>(apiUrl + "users");
  }
}
