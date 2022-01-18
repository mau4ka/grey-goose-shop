import { PreloaderComponent } from './components/preloader/preloader.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FacebookSvgComponent } from './components/facebook-svg/facebook-svg.component';
import { InstagramSvgComponent } from './components/instagram-svg/instagram-svg.component';
import { TelegramSvgComponent } from './components/telegram-svg/telegram-svg.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeartSvgComponent } from './components/heart-svg/heart-svg.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    RouterModule,
    PreloaderComponent,
    FacebookSvgComponent,
    InstagramSvgComponent,
    TelegramSvgComponent,
    TranslateModule,
    HeartSvgComponent,
  ],
  declarations: [
    HeaderComponent,
    PreloaderComponent,
    FacebookSvgComponent,
    InstagramSvgComponent,
    TelegramSvgComponent,
    HeartSvgComponent,
  ],
})
export class SharedModule {}
