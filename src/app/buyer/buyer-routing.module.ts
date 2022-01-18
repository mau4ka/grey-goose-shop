import { UpdateBuyerComponent } from './update-buyer/update-buyer.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { AuthBuyerGuard } from '../shared/authBuyer.guard';
import { BuyerPageComponent } from './buyer-page/buyer-page.component';

const routes: Routes = [
  { path: '', component: BuyerPageComponent, canActivate: [AuthGuard, AuthBuyerGuard] },
  { path: 'updateBuyer', component: UpdateBuyerComponent, canActivate: [AuthGuard, AuthBuyerGuard] },
  {
    path: '**',
    redirectTo: '/buyer',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
