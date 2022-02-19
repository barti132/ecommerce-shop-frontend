import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product.model";
import {ProductService} from "../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getRandomProducts();
  }

  private getRandomProducts() {
    this.productService.getRandomProducts().subscribe((products)=>{
      this.products = products;
    })
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
