import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDataAdmin} from "../models/userDataAdmin.model";
import {environment} from "../../environments/environment";

const apiUrl = environment.address + 'admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUserDataForAdmin(): Observable<UserDataAdmin[]>{
    return this.http.get<UserDataAdmin[]>(apiUrl + "users");
  }
}
