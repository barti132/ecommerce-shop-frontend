import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {ProductListPageComponent} from "./product-list-page/product-list-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},

  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'category/:category', component: CategoryPageComponent},
  {path: 'category/:category/subcategory/:subcategory', component: ProductListPageComponent},
  {path: 'category/:category/subcategory/:subcategory/product/:id', component: ProductPageComponent},

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
