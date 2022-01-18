import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  localStorage = localStorage;

  navbarOpen = false;
  constructor(
    public auth: AuthService, 
    private router: Router,
    public translate: TranslateService) {}

  ngOnInit(): void {}

  switchLanguage(lang: string) {
    this.translate.use(lang)
  }

  onLogout() {
    const logOut = confirm('You really want logout?');
    if (logOut) {
      this.auth.logout();
      this.router.navigate(['/'])
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  closeNavbar() {
    if (this.navbarOpen) {
      this.navbarOpen = false;
    }
  }
}
