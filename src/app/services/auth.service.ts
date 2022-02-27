import { Injectable } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";

const apiUrl = 'http://localhost:8080/api/v1/';


interface authRespond {
  authenticationToken: string,
  refreshToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  registerUser(form: NgForm): Observable<Object>{
    let userSignUp = {
      "email": form.value.email,
      "login": form.value.login,
      "password": form.value.password,
      "name": form.value.name,
      "lastName": form.value.lastName
    }

    return this.http.post(apiUrl + "auth/signup", userSignUp, {responseType: 'text'});
  }

  login(form: NgForm): Observable<string>{
    //token data: "iss":"self","sub":"admin","exp":1645906648,"iat":1645905748,"scope":"admin""

    let cred = {
      "login": form.value.login,
      "password": form.value.password
    }

    return this.http.post<authRespond>(apiUrl + "auth/login", cred).pipe(map((val: authRespond) => {
        let jwt = val.authenticationToken;

        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        this.storage.store("name", decodedJwtData.sub);
        this.storage.store("role", decodedJwtData.scope);
        this.storage.store("token", jwt);
        this.storage.store("refreshToken", val.refreshToken);

        return "success";
      }),
      map((response) => {return "error: " + response;}));
  }

  logout(): void{
    let logoutData = {
      "refreshToken": this.storage.retrieve("refreshToken"),
      "login": this.storage.retrieve("name")
    }

    this.http.post(apiUrl + "auth/logout", logoutData);

    this.storage.clear("name");
    this.storage.clear("role");
    this.storage.clear("token");
    this.storage.clear("refreshToken");
  }
}
