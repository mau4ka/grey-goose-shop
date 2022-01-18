import { Product } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';
import { AuthService } from '../shared/services/auth.service';
import { AdminSellerService } from '../seller/adminSeller.service';

@Component({
  selector: 'app-one-product-page',
  templateUrl: './one-product-page.component.html',
  styleUrls: ['./one-product-page.component.scss'],
})
export class OneProductPageComponent implements OnInit {
  id!: string;
  localStorage = localStorage;
  sellerId: string = '';
  isLogin: boolean | Promise<boolean> = false;
  product!: Product;
  private subscription!: Subscription;
  isLoading:boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    public auth: AuthService,
    private adminSellerService: AdminSellerService,
    private router: Router
  ) {
    this.subscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isLogin = this.auth.isLogin();
    this.sellerId = localStorage.getItem('grey-id') || '';
    this.productService.getProduct(this.id).subscribe((product) => {
      this.product = product;
      this.isLoading = false;
    });
  }

  deleteProduct() {
    const deleteConf = confirm('You really want delete product?');
    if (deleteConf) {
      this.adminSellerService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/seller']);
      });
    }
  }
}
