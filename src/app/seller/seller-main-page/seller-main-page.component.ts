import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getSeller } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminSellerService} from '../adminSeller.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './seller-main-page.component.html',
  styleUrls: ['./seller-main-page.component.scss'],
})
export class AdminMainPageComponent implements OnInit {
  constructor(
    private sellerService: AdminSellerService,
    private auth: AuthService,
    private router: Router
  ) {}

  seller!: getSeller | undefined;
  ngOnInit(): void {
    this.sellerService.getUserInfo().subscribe((seller) => {
      this.seller = seller;
    });
  }

  deleteSeller() {
    const deleteConf = confirm('You really want delete seller?');
    if (deleteConf) {
      this.sellerService.deleteSeller(this.seller!.id || '').subscribe(() => {
        this.auth.logout()
        this.router.navigate(['/']);
      });
    }
  }
}
