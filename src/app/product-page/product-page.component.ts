import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: Product = {
    id: 0,
    category: "",
    producerName: "",
    name: "",
    description: "",
    img: "",
    priceNet: 0,
    priceGross: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.getProduct(routeParams['id']);
    });
  }

  private getProduct(id: number) {
    this.productService.getProduct(id).subscribe((product) => {
      console.log(product)
      this.product = product;
    });
  }

  public getSanitizeUrl(url: string) {
    if (url !== "")
      return this.sanitizer.bypassSecurityTrustUrl(url);
    else
      return "assets/images/placeholder.png";
  }

}
