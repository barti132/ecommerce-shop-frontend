import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(form: NgForm): void{
    let product = form.value.var;
    let category = form.value.category;

    if(product != "")
      this.router.navigate(['/search/' + category + '/' + product]);
  }

}
