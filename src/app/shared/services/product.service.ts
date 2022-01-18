import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  Observable,
  ObservableInput,
  tap,
  map,
  throwError,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  categoryList: string[] = [
    'All products',
    'Vegetables',
    'Fruits',
    'Bread and confectionery',
    'Dairy products',
    'Berries',
    'Honey',
    'Meat',
    'Poultry',
    'Other'
  ];

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.products.slice();
  }

  getProductsOfSeller(id: string) {
    return this.http
      .get<Product[]>(`${environment.fbDbUrl}/products/${id}`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response) {
            return response['message']['products'];
          }
        }),
        tap((products) => {
          this.setProducts(products);
        })
      );
  }

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    this.setProducts([]);
    return throwError(error);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/products/one/${id}`).pipe(
      map((response: { [key: string]: any }) => {
        if (response) {
          return response['message'];
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getProductByCategory(category: string) {
    if (category === 'All products') {
      return this.products;
    } else {
      const productsByCategory = this.products.filter((product) => {
        return product.category === category;
      });
      return productsByCategory;
    }
  }

  addBoard(newProduct: Product) {
    this.products.push(newProduct);
  }

  setProducts(products: Product[]) {
    this.products = products;
  }
}
