import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Product } from '../../shared/interfaces';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products-of-seller-list',
  templateUrl: './products-of-seller-list.component.html',
  styleUrls: ['./products-of-seller-list.component.scss'],
})
export class ProductsOfSellerListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() products: Product[] = [];
  @Input() productCategory: string = '';
  @Input() noProducts: boolean = false;
  productsTemp: Product[] = [];
  @ViewChild('inputFrom', {'static': true}) inputFrom!: ElementRef;
  @ViewChild('inputTo', {'static': true}) inputTo!: ElementRef;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.inputFrom.nativeElement.value = '';
    this.inputTo.nativeElement.value = '';
  }
  ngOnChanges() {
    this.inputFrom.nativeElement.value = '';
    this.inputTo.nativeElement.value = '';
  }

  onPriceRange(form: NgForm) {
    this.productsTemp = this.productService.getProductByCategory(this.productCategory)
    let priceFrom = form.value.priceFrom;
    let priceTo = form.value.priceTo;
    
    if (!priceFrom) {
      priceFrom = 0;
    }
    if (!priceTo) {
      priceTo = 10000;
    }
    
    const filtredProd = this.productsTemp.filter((product) => {
      return product.price >= priceFrom && product.price <= priceTo;
    });
    this.products = filtredProd;
  }

  onReset(form: NgForm) {
    form.reset();
    this.products = this.productService.getProductByCategory(
      this.productCategory
    );
  }

  onSortProducts(value: string) {
    if (value === 'priceAc') {
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (value === 'priceDes') {
      this.products.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (value === 'nameAc') {
      this.products.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    if (value === 'nameDes') {
      this.products.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }
}
