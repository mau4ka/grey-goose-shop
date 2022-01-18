import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  Observable,
  ObservableInput,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, UserRegister } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string | null {
    const date = localStorage.getItem('grey-token-exp') ?? new Date();
    const expDate = new Date(date);
    if (new Date() > expDate) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('grey-token');
    }
  }

  isLogin(): Promise<boolean> | boolean {
    return !!this.token;
  }

  private setToken(res: any) {
    if (res) {
      const expDate = new Date(new Date().getTime() + 259200 * 1000);
      localStorage.setItem('grey-token', res.message.token);
      localStorage.setItem('grey-token-exp', expDate.toString());
      localStorage.setItem('grey-role', res.message.user.role);
      localStorage.setItem('grey-id', res.message.user.id);
    } else {
      localStorage.clear();
    }
  }

  login(user: UserLogin): Observable<any> {
    return this.http
      .post(`${environment.fbDbUrl}/login`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  registerSeller(user: UserRegister) {
    return this.http
      .post(`${environment.fbDbUrl}/register/seller`, user)
      .pipe(catchError(this.handleError.bind(this)));
  }

  registerBuyer(user: UserRegister) {
    return this.http
      .post(`${environment.fbDbUrl}/register/buyer`, user)
      .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    const message = error.error.message;
    this.error$.next(message);
    return throwError(error);
  }

  logout() {
    this.setToken(null);
    //this.router.navigate(['/login'])
  }
}
