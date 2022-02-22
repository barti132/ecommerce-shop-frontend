import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() products: Product[] = [];

  displayFormat = true;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  public getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  changeDisplayFormat(format: boolean){
    this.displayFormat = format;
  }

}
