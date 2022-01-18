import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ){
    translate.addLangs(['en', 'ua', 'ru', 'be']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {}
}
