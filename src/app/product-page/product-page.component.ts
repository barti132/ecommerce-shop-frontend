import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";

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
    priceGross: 0,
    amount: 0
  };

  isLogged = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.getProduct(routeParams['id']);
    });
    this.isLogged = this.authService.isLoggedIn();
  }

  private getProduct(id: number): void {
    this.productService.getProduct(id).subscribe((product) => {
      console.log(product)
      this.product = product;
    });
  }

  public getSanitizeUrl(url: string): SafeUrl {
    if (url !== "")
      return this.sanitizer.bypassSecurityTrustUrl(url);
    else
      return "assets/images/placeholder.png";
  }

  addToCart(form: NgForm): void{

  }

  navigateToLoginPage(): void{
    this.router.navigate(['login']);
  }
}
