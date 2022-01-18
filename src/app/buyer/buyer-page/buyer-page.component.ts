import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Buyer, Seller } from '../../shared/interfaces';
import { SellersService } from '../../shared/services/sellers.service';
import { BuyerService } from '../buyer.service';

@Component({
  selector: 'app-buyer-page',
  templateUrl: './buyer-page.component.html',
  styleUrls: ['./buyer-page.component.scss'],
})
export class BuyerPageComponent implements OnInit {
  constructor(
    private sellersService: SellersService,
    private buyerService: BuyerService,
    private router: Router,
    private auth: AuthService
  ) {}
  buyer!: Buyer;
  favSellers: Seller[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.buyerService.getUserInfo().subscribe((buyer) => {
      if (buyer) {
        this.buyer = buyer;
        this.isLoading = true;
        for (let sellerId of this.buyer.favoriteSellers) {
          this.sellersService.getSeller(sellerId).subscribe((favSeller) => {
            this.favSellers.push(favSeller);
          });
        }
        this.isLoading = false;
      }
    });
  }

  onDeleteFromFav(event: MouseEvent, sellerId: string) {
    event.preventDefault();
    event.stopPropagation();

    this.buyerService.deleteLike(sellerId).subscribe((buyer) => {
      if (buyer) {
        const index = this.favSellers.findIndex(
          (seller) => seller.id === sellerId
        );
        this.favSellers.splice(index, 1);
        this.buyer.favoriteSellers.splice(
          this.buyer.favoriteSellers.indexOf(sellerId),
          1
        );
      }
    });
  }

  onDeleteBuyer() {
    const deleteConf = confirm('You really want delete product?');
    if (deleteConf) {
      this.buyerService.deleteBuyer(this.buyer.id || '').subscribe(() => {
        this.auth.logout();
        this.router.navigate(['/']);
      });
    }
  }
}
