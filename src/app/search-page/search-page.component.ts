import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{

  products: Product[] = [];
  producers: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title){
    this.titleService.setTitle("Ecommerce | Search page");
  }

  ngOnInit(): void{
    this.route.params.subscribe((routeParams) => {
      this.findProducts(routeParams['category'], routeParams['product']);
    });
  }

  private findProducts(category: string, product: string): void{
    this.productService.searchProducts(category, product).subscribe((products) => {
      this.products = products;
      this.setProducerData();
    });
  }

  private setProducerData(): void{
    let set = new Set<String>();
    for(let product of this.products){
      set.add(product.producerName);
    }
    this.producers = Array.from(set);
  }

  applyFilters(form: NgForm): void{
    this.route.params.subscribe((routeParams) => {
      this.productService.searchProductsFilters(routeParams['category'], routeParams['product'], form.value.producer, form.value.price).subscribe(
        (products) => {
          this.products = products;
        });
    });
  }
}
