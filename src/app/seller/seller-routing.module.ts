import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { AuthSellerGuard } from '../shared/authSeller.guard';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminMainPageComponent } from './seller-main-page/seller-main-page.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateSellerComponent } from './update-seller/update-seller.component';

const routes: Routes = [
  { path: '', component: AdminMainPageComponent, canActivate: [AuthGuard, AuthSellerGuard]},
  { path: 'add', component: AddProductComponent, canActivate: [AuthGuard, AuthSellerGuard]},
  { path: 'logo', component: AddPhotoComponent, canActivate: [AuthGuard, AuthSellerGuard]},
  { path: 'updateSeller', component: UpdateSellerComponent, canActivate: [AuthGuard, AuthSellerGuard]},
  { path: 'update/:id', component: UpdateProductComponent, canActivate: [AuthGuard, AuthSellerGuard]},
  {
    path: '**',
    redirectTo: '/seller',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
