import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserData} from "../models/userData.model";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

const apiUrl = environment.address + 'user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getDataAboutCurrentUser(): Observable<UserData> {

    return this.http.get<UserData>(apiUrl + this.authService.getName());
  }

  addNewAddress(form: NgForm): Observable<String> {
    let addressReq = {
      "address": form.value.address,
      "city": form.value.city,
      "country": form.value.country,
      "postalCode": form.value.postalCode
    }

    return this.http.post(apiUrl + this.authService.getName() + "/add-address", addressReq, {responseType: 'text'});
  }

  updateUserData(form: NgForm): Observable<UserData> {
    let userData: UserData = {
      "name": form.value.name,
      "lastName": form.value.lastName,
      "email": form.value.email,
      "login": form.value.login,
      "phoneNumber": form.value.phoneNumber,
      addresses: []
    }

    return this.http.put<UserData>(apiUrl + this.authService.getName() + "/update", userData);
  }

  changeUserPassword(password: string): Observable<String> {
    let passwordDto = {
      "password": password
    }
    return this.http.put(apiUrl + this.authService.getName() + "/change-password", passwordDto, {responseType: 'text'});
  }

  deleteAddressById(id: number): Observable<Object> {
    return this.http.delete(apiUrl + this.authService.getName() +"/address/" + id);
  }
}
