import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterStartComponent } from './register-page/register-start/register-start.component';
import { RegisterSellerComponent } from './register-page/register-seller/register-seller.component';
import { RegisterBuyerComponent } from './register-page/register-buyer/register-buyer.component';
import { OneProductPageComponent } from './one-product-page/one-product-page.component';
import { ProductsOfSellerComponent } from './products-of-seller/products-of-seller.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    children: [
      { path: '', component: RegisterStartComponent },
      { path: 'seller', component: RegisterSellerComponent },
      { path: 'buyer', component: RegisterBuyerComponent },
    ]
  },
  {
    path: 'products/:sellerId',
    component: ProductsOfSellerComponent,
  },
  {
    path: 'product/:id',
    component: OneProductPageComponent,
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
  { path: 'buyer', loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule) },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
