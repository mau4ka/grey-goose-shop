import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  ObservableInput,
  Subject,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SellersService {
  constructor(private http: HttpClient) {}

  public error$: Subject<string> = new Subject<string>();

  getSellers(country: string): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/sellers/${country}`).pipe(
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

  getSeller(id: string) {
    return this.http.get(`${environment.fbDbUrl}/users/${id}`).pipe(
      map((response: { [key: string]: any }) => {
        if (response) {
          return response['message'];
        }
      })
    );
  }
}
