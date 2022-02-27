import { Injectable } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const apiUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(form: NgForm): Observable<Object>{
    let userData = {
      "email": form.value.email,
      "login": form.value.login,
      "password": form.value.password,
      "name": form.value.name,
      "lastName": form.value.lastName
    }

    console.log(userData);

    return this.http.post(apiUrl + "auth/signup", userData, {responseType: 'text'});
  }

  login(){
    //"iss":"self","sub":"admin","exp":1645906648,"iat":1645905748,"scope":"admin""
    let jwt = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2NDU5MDY2NDgsImlhdCI6MTY0NTkwNTc0OCwic2NvcGUiOiJhZG1pbiJ9.FTHu0mYlFqRf9kgNMxxzuZzsbCVk670y1t-myka7Rb7p5Nn7fxBqOFH7JSpEj3kaBDMmbICwdQoZGs50BZSZBTY3LJ0q0SfPs7G6w_KLrczGZpSK_dfZvMbLp_gIus8sCJB1v20Y_9OroTBuQLhTDldRWczyYS1m0eeCvc8PlAv-9VWsp3rq71_CVMs5rD8iLNhnwoQtoDNG-oAhpsHGn-fFRey1SM7WQI_vyaUVgMP8FiyM5JpncnW5F-Y7LbChKh-0mPRxO5IjLviPgNpGeHAH9YPscjfTZo9qigjf-p4wiWHfb9fNP1aCKBdTscu2GFrpNLhJe_WnxRP4UIeSmw'

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    let isAdmin = decodedJwtData.admin

    console.log('jwtData: ' + jwtData)
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
    console.log('decodedJwtData: ' + decodedJwtData)
    console.log('Is admin: ' + isAdmin)
  }
}
