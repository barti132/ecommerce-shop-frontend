import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {AdminUsersPageComponent} from "./admin-users-page/admin-users-page.component";
import {AuthGuard} from "./services/auth.guard";
import {AdminStockPageComponent} from "./admin-stock-page/admin-stock-page.component";
import {AdminNewProductPageComponent} from "./admin-new-product-page/admin-new-product-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartPageComponent, canActivate: [AuthGuard]},
  {path: 'admin-stock-page', component: AdminStockPageComponent, canActivate: [AuthGuard]},
  {path: 'admin-new-product-page', component: AdminNewProductPageComponent, canActivate: [AuthGuard]},
  {path: 'admin-users-page', component: AdminUsersPageComponent, canActivate: [AuthGuard]},
  {path: 'category/:category', component: CategoryPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'search/:category/:product', component: SearchPageComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
