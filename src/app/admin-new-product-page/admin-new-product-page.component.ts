import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-new-product-page',
  templateUrl: './admin-new-product-page.component.html',
  styleUrls: ['./admin-new-product-page.component.css']
})
export class AdminNewProductPageComponent implements OnInit{

  constructor(private titleService: Title){
    this.titleService.setTitle("Ecommerce | Add new product");
  }

  ngOnInit(): void{
  }

}
