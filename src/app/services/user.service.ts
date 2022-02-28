import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserData} from "../models/userData.model";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

const apiUrl = 'http://localhost:8080/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDataAboutCurrentUser(): Observable<UserData>{

    return this.http.get<UserData>(apiUrl + "currentUser");
  }

  addNewAddress(form: NgForm) {
    let addressReq = {
      "address": form.value.address,
      "city": form.value.city,
      "country": form.value.country,
      "postalCode": form.value.postalCode
    }

    return this.http.post( apiUrl + "addAddress", addressReq, {responseType: 'text'});
  }

  updateUserData(form: NgForm) {

  }

  changeUserPassword(password: string) {

  }

  deleteAddressById(id: number) {
    return this.http.delete(apiUrl + "address/" + id);
  }
}
