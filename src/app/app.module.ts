import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {FooterComponent} from './page-elements/footer/footer.component';
import {NavbarComponent} from './page-elements/navbar/navbar.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FilterBarComponent} from './page-elements/filter-bar/filter-bar.component';
import {ProductsListComponent} from './page-elements/products-list/products-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {UserPageComponent} from './user-page/user-page.component';
import {TokenInterceptor} from "./token-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductPageComponent,
    FooterComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CategoryPageComponent,
    SearchPageComponent,
    FilterBarComponent,
    ProductsListComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
