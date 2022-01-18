import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  isLoading: boolean = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: UserLogin = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.isLoading = true;
    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.isLoading = false;
      this.router.navigate(['/']);
    });
    if(this.auth.error$){
      this.isLoading = false;
    }
  }
}
