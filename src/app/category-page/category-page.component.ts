import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit{

  products: Product[] = [];
  producers: String[] = [];
  categoryName = "";
  filterPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title){
    this.titleService.setTitle("Ecommerce | Category page");
  }


  ngOnInit(): void{
    this.route.params.subscribe((routeParams) => {
      this.getProducts(routeParams['category']);
    });
  }

  private getProducts(category: string): void{
    this.categoryName = category;
    this.productService.getProductByCategory(category).subscribe((products) => {
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
    this.productService.getProductsByCategoryFilter(this.categoryName, form.value.producer, form.value.price).subscribe(
      (products) => {
        this.products = products;
      }
    )
  }

}
