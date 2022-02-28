import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserData} from "../models/userData.model";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

const apiUrl = 'http://localhost:8080/api/v1/user/';

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
    let userData: UserData ={
      "name": form.value.name,
      "lastName": form.value.lastName,
      "email": form.value.email,
      "login": form.value.login,
      "phoneNumber": form.value.phoneNumber,
      addresses: []
    }

    return this.http.put<UserData>(apiUrl + "update", userData);
  }

  changeUserPassword(password: string) {
    let passwordDto = {
      "password": password
    }
    return this.http.put(apiUrl + "changePassword", passwordDto,{responseType: 'text'});
  }

  deleteAddressById(id: number) {
    return this.http.delete(apiUrl + "address/" + id);
  }
}
