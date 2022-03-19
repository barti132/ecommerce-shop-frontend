import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-new-product-page',
  templateUrl: './admin-new-product-page.component.html',
  styleUrls: ['./admin-new-product-page.component.css']
})
export class AdminNewProductPageComponent implements OnInit{

  image: File;

  constructor(private titleService: Title, private adminService: AdminService, private toastr: ToastrService){
    this.titleService.setTitle("Ecommerce | Add new product");
  }

  ngOnInit(): void{
  }

  addNewProduct(productForm: NgForm): void{
    if(this.image != null && this.image.size < 513_000){
      this.adminService.uploadImage(this.image).subscribe({
        next: () => {
          this.adminService.addNewProduct(productForm, this.image.name).subscribe({
            next: () => {
              this.toastr.success("Added new product");
            },
            error: () => {
              this.toastr.error("Product not added");
            }
          });
        },
        error: () => {
          this.toastr.error("Upload image failed.");
        }
      });
    }
    else{
      this.toastr.error("Wrong image size!");
    }
  }

  selectFiles(event: Event){
    // @ts-ignore
    this.image = event.target.files[0];
    console.log(this.image.size)
  }
}
