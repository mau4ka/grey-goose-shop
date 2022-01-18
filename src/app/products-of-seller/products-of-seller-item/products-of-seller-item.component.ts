import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../shared/interfaces';
@Component({
  selector: 'app-products-of-seller-item',
  templateUrl: './products-of-seller-item.component.html',
  styleUrls: ['./products-of-seller-item.component.scss']
})
export class ProductsOfSellerItemComponent implements OnInit {
  
  @Input() product!: Product
  constructor() { }

  ngOnInit(): void {
  }

}
