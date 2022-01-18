import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerPageComponent } from './buyer-page/buyer-page.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateBuyerComponent } from './update-buyer/update-buyer.component';


@NgModule({
  declarations: [
    BuyerPageComponent,
    UpdateBuyerComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [
    TranslateModule,
  ]
})
export class BuyerModule { }
