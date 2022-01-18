import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { UserRegister } from '../../shared/interfaces'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrls: ['./register-seller.component.scss']
})
export class RegisterSellerComponent implements OnInit {
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
    const socialNetworksLinks = {
      facebook: form.value.facebook,
      instagram: form.value.instagram,
      telegram: form.value.telegram

    }
    const newSeller: UserRegister = {
      name: form.value.name, 
      email: form.value.email, 
      country: form.value.country,
      password: form.value.password,
      mobile: form.value.mobile, 
      address: form.value.address, 
      socialNetwork: JSON.stringify(socialNetworksLinks),
    }
     this.isLoading = true;
     this.authService.registerSeller(newSeller).subscribe(
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
