import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../shared/services/product.service';
import { SellersService } from '../shared/services/sellers.service';
import { Buyer, Product, Seller, socialNetwork } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { BuyerService } from '../buyer/buyer.service';

@Component({
  selector: 'app-products-of-seller',
  templateUrl: './products-of-seller.component.html',
  styleUrls: ['./products-of-seller.component.scss'],
})
export class ProductsOfSellerComponent implements OnInit {
  buyer!: Buyer;
  isLiked = false;
  productCategory: string = '';
  categoryList: string[] = [];
  selectedIndex!: number;
  products: Product[] = [];
  categoryOpen = false;
  localStorage= localStorage
  id: string = '';
  isLogin: boolean | Promise<boolean> = false;
  isNoProducts: boolean = false;
  links: socialNetwork | null = null;
  seller: Seller = {
    id: '',
    name: '',
    email: '',
    country: '',
    mobile: 0,
    address: '',
    socialNetwork: '',
    photo: null,
  };
  isLoading: boolean = false;
  @ViewChild('li', { static: true }) li!: ElementRef<HTMLLIElement>;

  constructor(
    private productService: ProductService,
    private sellersService: SellersService,
    private buyerService: BuyerService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.productCategory = localStorage.getItem('category') || 'All products';
    this.isLoading = true;

    this.route.params.subscribe((params: Params) => {
      this.id = params['sellerId'];

      this.productService.getProductsOfSeller(this.id).subscribe(
        () => {
          this.products = this.productService.getProductByCategory(
            this.productCategory
          );
          this.isLoading = false;
        },
        (error) => {
          this.productService.setProducts([]);
          this.products = this.productService.getProducts();
          this.isNoProducts = true;
          this.isLoading = false;
        }
      );
    });
    this.categoryList = this.productService.categoryList;

    this.sellersService.getSeller(this.id).subscribe((resp) => {
      this.seller = resp;
      if(resp.socialNetwork !== 'ASS'){
        this.links = JSON.parse(resp.socialNetwork);
      }
    });

    if (localStorage.getItem('grey-role') === 'buyer') {
      this.buyerService.getUserInfo().subscribe((buyer) => {
        if (buyer) {
          buyer.favoriteSellers&&buyer.favoriteSellers.includes(this.id) ? this.isLiked = true : this.isLiked = false
        }
      });
    }
  }

  activeClass(category: string, selectedIndex: number, i: number) {
    if (localStorage.getItem('category') === category) {
      return true;
    } else if (selectedIndex === i) {
      return true;
    } else {
      return false;
    }
  }

  onCategoryClick(category: string, index: number) {
    this.productCategory = category;
    this.selectedIndex = index;
    this.products = this.productService.getProductByCategory(category);
    this.li.nativeElement.innerText = category;
    localStorage.setItem('category', category);
    if (this.categoryOpen) {
      this.categoryOpen = false;
    }
  }

  selectCategory() {
    this.categoryOpen = !this.categoryOpen;
  }

  closeCategory() {
    if (this.categoryOpen) {
      this.categoryOpen = false;
    }
  }

  onAllProductsClick() {
    this.products = this.productService.getProducts();
  }

  setLike() {
    if(!this.isLiked){
      this.buyerService.addLike(this.id).subscribe(() => {
       this.isLiked = !this.isLiked;
      
    });
    }else{
      this.buyerService.deleteLike(this.id).subscribe((buyer) => {
        if (buyer) {
          this.isLiked = !this.isLiked;
        }
      });
    }
    
  }
}
