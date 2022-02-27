import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterPageComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registerUser(form: NgForm): void {
    if (form.value.password === form.value.passRep) {
      this.authService.registerUser(form).subscribe(
        (val) => {
          this.toastr.success("Register successful. Please check your email, to active account. Redirect to login page in 5s.");
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);
        },
        response => {
          this.toastr.error("Register fail. " + response);
        },
        () => {
        });
    } else {
      this.toastr.error("Passwords don't match");
    }
  }
}
