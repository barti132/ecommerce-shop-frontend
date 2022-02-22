import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  products: Product[] = [];
  producers: String[] = [];
  categoryName = "";

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.getProducts(routeParams['category']);
    });
  }

  private getProducts(category: string) {
    this.categoryName = category;
    this.productService.getProductByCategory(category).subscribe((products) => {
      this.products = products;

      let set = new Set<String>();
      for(let product of products){
        set.add(product.producer_name);
      }
      this.producers = Array.from(set);
    });
  }

}
