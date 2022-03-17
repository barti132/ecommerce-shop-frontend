import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-stock-page',
  templateUrl: './admin-stock-page.component.html',
  styleUrls: ['./admin-stock-page.component.css']
})
export class AdminStockPageComponent implements OnInit{

  constructor(private titleService: Title){
    this.titleService.setTitle("Ecommerce | Stock page");
  }

  ngOnInit(): void{
  }

}
