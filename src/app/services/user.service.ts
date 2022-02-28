import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserData} from "../models/userData.model";
import {HttpClient} from "@angular/common/http";

const apiUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDataAboutCurrentUser(): Observable<UserData>{

    return this.http.get<UserData>(apiUrl + "users/currentUser");
  }
}
