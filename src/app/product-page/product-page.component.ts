import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {DomSanitizer, SafeUrl, Title} from "@angular/platform-browser";
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import {CartService} from "../services/cart.service";
import {ToastrService} from "ngx-toastr";
import {Stock} from "../models/stock.model";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{


  product: Product = {
    id: 0,
    category: "",
    producerName: "",
    name: "",
    description: "",
    img: "",
    priceNet: 0,
    priceGross: 0,
    available: true
  };

  stock: Stock = {
    id: 1,
    product: this.product,
    amount: 0,
    updatedDate: new Date("")
  }

  isLogged = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,
    private titleService: Title){
    this.titleService.setTitle("Ecommerce | Product page");
  }

  ngOnInit(): void{
    this.route.params.subscribe((routeParams) => {
      this.getProduct(routeParams['id']);
    });
    this.isLogged = this.authService.isLoggedIn();
  }

  private getProduct(id: number): void{
    this.productService.getProductStock(id).subscribe((stock) => {
        this.stock = stock
        this.product = stock.product;
      },
      () => {
        this.productService.getProduct(id).subscribe((product) => {
          this.product = product;
          this.stock.amount = 0;
        })
      });
  }

  public getSanitizeUrl(url: string): SafeUrl{
    if(url !== "")
      return this.sanitizer.bypassSecurityTrustUrl(url);
    else
      return "assets/images/placeholder.png";
  }

  addToCart(form: NgForm): void{
    if(form.value.amount == null || form.value.amount < 1 || form.value.amount > this.stock.amount){
      this.toastr.error("Fail!");
    }else{
      this.cartService.addItemToCart(this.product.id, form.value.amount).subscribe(() => {
          this.toastr.success("Added to your shopping cart.");
        },
        () => {
          this.toastr.error("Fail!");
        })
    }
  }

  navigateToLoginPage(): void{
    this.router.navigate(['login']);
  }
}
