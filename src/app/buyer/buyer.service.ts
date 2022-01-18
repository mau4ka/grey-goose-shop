import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, ObservableInput, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  deleteBuyer(id: string) {
    return this.http
      .delete(`${environment.fbDbUrl}/buyers/${id}`)
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

  updateBuyer(user: UserUpdate, id: string) {
    return this.http
      .patch(`${environment.fbDbUrl}/buyers/${id}`, user)
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

  addLike(id: string) {
    return this.http.post(`${environment.fbDbUrl}/buyers/favorite/${id}`, null).pipe(
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

  deleteLike(id: string) {
    return this.http
      .delete(`${environment.fbDbUrl}/buyers/favorite/${id}`)
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

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    const message = error.error.message;
    this.error$.next(message);
    return throwError(error);
  }
}
