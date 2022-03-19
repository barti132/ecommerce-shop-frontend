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

  selectedFile: File;

  constructor(private titleService: Title, private adminService: AdminService, private toastr: ToastrService){
    this.titleService.setTitle("Ecommerce | Add new product");
  }

  ngOnInit(): void{
  }

  addNewProduct(productForm: NgForm): void{
    this.adminService.uploadImage(this.selectedFile).subscribe(() => {
        this.adminService.addNewProduct(productForm, this.selectedFile.name).subscribe(() => {
            this.toastr.success("Added new product");
          },
          () => {
            this.toastr.error("Product not added");
          });
      },
      () => {
        this.toastr.error("Upload image failed.");
      })
  }

  selectFiles(event: Event){
    // @ts-ignore
    this.selectedFile = event.target.files[0];
  }
}
