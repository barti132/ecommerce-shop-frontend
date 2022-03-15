import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router"
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  isAdmin = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  search(form: NgForm): void {
    let product = form.value.var;
    let category = form.value.category;

    if (product != "")
      this.router.navigate(['/search/' + category + '/' + product]);
  }

  logout(): void {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['']);
  }

}
