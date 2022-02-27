import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  signInUser(form: NgForm): void{
    this.authService.login(form).subscribe(
      (val) => {
        this.toastr.success("Success!");
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);
      },
      response => {
        this.toastr.error("Sign in fail. " + response);
      });
  }

}
