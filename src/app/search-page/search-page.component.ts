import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  products: Product[] = [];
  producers: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.findProducts(routeParams['category'], routeParams['product']);
    });
  }

  private findProducts(category: string, product: string) {
    this.productService.searchProducts(category, product).subscribe((products) => {
      this.products = products;

      let set = new Set<String>();
      for(let product of products){
        set.add(product.producerName);
      }
      this.producers = Array.from(set);
    });
  }

  applyFilters(form: NgForm){
    console.log(form.value.price, form.value.producer);
  }
}
