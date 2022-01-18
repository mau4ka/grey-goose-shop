import { NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AdminMainPageComponent } from './seller-main-page/seller-main-page.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { AddProductComponent } from './add-product/add-product.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateSellerComponent } from './update-seller/update-seller.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [AdminMainPageComponent, AddProductComponent, AddPhotoComponent, UpdateProductComponent, UpdateSellerComponent],
  imports: [
    CommonModule, 
    SellerRoutingModule, 
    SharedModule,
    TranslateModule,
  ],
  exports: [
    TranslateModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
})
export class SellerModule {}
