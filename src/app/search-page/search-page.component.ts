import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.findProducts(routeParams['category'], routeParams['product']);
    });
  }

  private findProducts(category: string, product: string) {
    this.productService.searchProducts(category, product).subscribe((products) => {
        this.products = products;
        console.log(products)
      });
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
