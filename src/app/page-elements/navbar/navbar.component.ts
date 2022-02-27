import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router"
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  constructor(private router: Router, private storage: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.storage.retrieve("token") == null){
      this.isLogged = false;
    }
    else{
      this.isLogged = true;
    }
  }

  search(form: NgForm): void{
    let product = form.value.var;
    let category = form.value.category;

    if(product != "")
      this.router.navigate(['/search/' + category + '/' + product]);
  }

  logout(): void{
    this.authService.logout();
    this.isLogged = false;
  }

}
