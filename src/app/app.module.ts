import { AuthInterceptor } from './shared/auth.interceptor';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SharedModule } from './shared/shared.module';
import { RegisterBuyerComponent } from './register-page/register-buyer/register-buyer.component';
import { RegisterSellerComponent } from './register-page/register-seller/register-seller.component';
import { RegisterStartComponent } from './register-page/register-start/register-start.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OneProductPageComponent } from './one-product-page/one-product-page.component';
import { ProductsOfSellerComponent } from './products-of-seller/products-of-seller.component';
import { ProductsOfSellerListComponent } from './products-of-seller/products-of-seller-list/products-of-seller-list.component';
import { ProductsOfSellerItemComponent } from './products-of-seller/products-of-seller-item/products-of-seller-item.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterBuyerComponent,
    RegisterSellerComponent,
    RegisterStartComponent,
    OneProductPageComponent,
    ProductsOfSellerComponent,
    ProductsOfSellerListComponent,
    ProductsOfSellerItemComponent,
    
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n', '.json')
}
