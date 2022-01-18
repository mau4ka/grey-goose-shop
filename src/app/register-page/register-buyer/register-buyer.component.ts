import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { UserRegister } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-buyer',
  templateUrl: './register-buyer.component.html',
  styleUrls: ['./register-buyer.component.scss']
})
export class RegisterBuyerComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const newBuyer: UserRegister = {
      name: form.value.name, 
      email: form.value.email, 
      country: form.value.country,
      password: form.value.password,
    }
    this.isLoading = true;
    this.authService.registerBuyer(newBuyer).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
        form.reset();
        form.controls['country'].setValue('');
      },
    );
    if(this.authService.error$){
      this.isLoading = false;
    }

    
    
  }

}
