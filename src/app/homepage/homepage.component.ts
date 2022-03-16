import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product.model";
import {ProductService} from "../services/product.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private titleService: Title){
    this.titleService.setTitle("Ecommerce | Homepage");
  }

  ngOnInit(): void{
    this.getRandomProducts();
  }

  private getRandomProducts(): void{
    this.productService.getRandomProducts().subscribe((products) => {
      this.products = products;
    })
  }


}
