import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router, private titleService: Title){
    this.titleService.setTitle("Ecommerce | Login");
  }

  ngOnInit(): void{
  }

  signInUser(form: NgForm): void{
    this.authService.login(form).subscribe({
      next: () => {
        this.toastr.success("Success!");
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);
      },
      error: () => {
        this.toastr.error("Sign in fail.");
      }
    });
  }

}
