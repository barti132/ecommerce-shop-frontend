import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';

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
    ProductListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
