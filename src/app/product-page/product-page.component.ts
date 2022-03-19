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
import {AdminService} from "../services/admin.service";

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

  isLogged: boolean = false;
  isAdmin: boolean = false;
  editMode: boolean = false;

  newImage: File;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,
    private titleService: Title,
    private adminService: AdminService){
    this.titleService.setTitle("Ecommerce | Product page");
  }

  ngOnInit(): void{
    this.route.params.subscribe((routeParams) => {
      this.getProduct(routeParams['id']);
    });
    this.isLogged = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  changeEditMode(): void{
    this.editMode = !this.editMode;
  }

  private getProduct(id: number): void{
    this.productService.getProductStock(id).subscribe({
      next: (stock) => {
        this.stock = stock
        this.product = stock.product;
      },
      error: () => {
        this.productService.getProduct(id).subscribe((product) => {
          this.product = product;
          this.stock.amount = 0;
        })
      }
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
      this.cartService.addItemToCart(this.product.id, form.value.amount).subscribe({
        next: () => {
          this.toastr.success("Added to your shopping cart.");
        },
        error: () => {
          this.toastr.error("Fail!");
        }
      });
    }
  }

  navigateToLoginPage(): void{
    this.router.navigate(['login']);
  }

  selectFiles(event: Event): void{
    // @ts-ignore
    this.newImage = event.target.files[0];
    console.log(this.newImage.size)
  }

  updateImage(): void{
    if(this.newImage != null && this.newImage.size < 513_000){
      this.adminService.uploadImage(this.newImage).subscribe({
        next: () => {
          let productData = {
            "name": this.product.name,
            "priceNet": this.product.priceNet,
            "category": this.product.category,
            "producerName": this.product.producerName,
            "description": this.product.description,
            "imgName": this.newImage.name
          };
          this.adminService.updateProductData(this.product.id, productData).subscribe({
            next: () => {
              this.getProduct(this.product.id);
              this.toastr.success("Changed image!");
            },
            error: () => {
              this.toastr.error("Error");
            }
          });
        },
        error: () => {
          this.toastr.error("Error upload image");
        }
      });
    }else{
      this.toastr.error("Image error");
    }
  }

  updateProduct(productUpdateForm: NgForm): void{
    let productData = {
      "name": productUpdateForm.value.name,
      "priceNet": productUpdateForm.value.priceNet,
      "category": productUpdateForm.value.category,
      "producerName": productUpdateForm.value.producerName,
      "description": productUpdateForm.value.description,
      "imgName": this.product.img
    };
    this.adminService.updateProductData(this.product.id, productData).subscribe({
      next: () => {
        this.getProduct(this.product.id);
        this.changeEditMode();
        this.toastr.success("Changed data!");
      },
      error: () => {
        this.toastr.error("Error");
      }
    });
  }
}
