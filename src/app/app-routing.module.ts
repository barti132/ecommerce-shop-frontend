import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'login', component: LoginPageComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
