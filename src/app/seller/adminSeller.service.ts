import { AddProduct, UpdateProduct, UserUpdate } from '../shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ObservableInput, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminSellerService {
  constructor(private http: HttpClient) {}

  public error$: Subject<string> = new Subject<string>();

  createProduct(product: AddProduct) {
    let data = new FormData();
    data.append('name', product.name);
    data.append('price', `${product.price}`);
    data.append('category', product.category);
    data.append('description', product.description);
    data.append('details', product.details);
    data.append('photo', product.photo);
    return this.http.post(`${environment.fbDbUrl}/products`, data).pipe(
      map((response) => {
        if (response) {
          return response;
        } else {
          return;
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  deleteProduct(id: string) {
    return this.http
      .delete(`${environment.fbDbUrl}/products/${id}`)
      .pipe(
        map((response) => {
          if (response) {
            return response;
          } else {
            return;
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  updateProduct(product: UpdateProduct) {
    return this.http
      .patch(`${environment.fbDbUrl}/products/${product.id}`, product)
      .pipe(
        map((response) => {
          if (response) {
            return response;
          } else {
            return;
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  updateSeller(user: UserUpdate, id: string) {
    return this.http
      .patch(`${environment.fbDbUrl}/sellers/${id}`, user)
      .pipe(
        map((response) => {
          if (response) {
            return response;
          } else {
            return;
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  deleteSeller(id: string) {
    return this.http
      .delete(`${environment.fbDbUrl}/sellers/${id}`)
      .pipe(
        map((response) => {
          if (response) {
            return response;
          } else {
            return;
          }
        }),
      );
  }

  createLogo(img: File | string) {
    let data = new FormData();
    data.append('logo', img);
    return this.http.post(`${environment.fbDbUrl}/sellers/logo`, data).pipe(
      map((response) => {
        if (response) {
          return response;
        } else {
          return;
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/users/me`).pipe(
      map((response: { [key: string]: any }) => {
        if (response) {
          return response['message'];
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    const message = error.error.message;
    this.error$.next(message);
    return throwError(error);
  }
}
