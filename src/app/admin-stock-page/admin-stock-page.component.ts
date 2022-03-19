import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdminService} from "../services/admin.service";
import {ToastrService} from "ngx-toastr";
import {Stock} from "../models/stock.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admin-stock-page',
  templateUrl: './admin-stock-page.component.html',
  styleUrls: ['./admin-stock-page.component.css']
})
export class AdminStockPageComponent implements OnInit{

  stocks: Stock[];

  constructor(private adminService: AdminService, private titleService: Title, private toastr: ToastrService){
    this.titleService.setTitle("Ecommerce | Stock page");
  }

  ngOnInit(): void{
    this.loadStockData();
  }

  loadStockData(): void{
    this.adminService.getStocks().subscribe((stocks) => this.stocks = stocks);
  }

  deleteStock(id: number): void{
    this.adminService.deleteStock(id).subscribe({
      next: () => {
        this.loadStockData();
        this.toastr.success("Success");
      },
      error: () => {
        this.toastr.error("Error");
      }
    });
  }

  updateAmount(id: number, amountForm: NgForm): void{
    this.adminService.updateAmount(id, amountForm).subscribe({
      next: () => {
        this.toastr.success("Success");
      },
      error: () => {
        this.toastr.error("Error");
      }
    });
  }
}
