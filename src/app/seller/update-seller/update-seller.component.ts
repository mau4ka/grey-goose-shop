import { UserUpdate } from '../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { AdminSellerService } from '../adminSeller.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './update-seller.component.html',
  styleUrls: ['./update-seller.component.scss'],
})
export class UpdateSellerComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  id!: string;
  role: string = localStorage.getItem('grey-role') || 'buyer';
  user!: UserUpdate;
  constructor(
    private router: Router,
    private sellerService: AdminSellerService,
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    
  }

  ngOnInit(): void {
    this.sellerService.getUserInfo().subscribe((user) => {
      
      this.user = user;
      if (this.role === 'seller') {
        let socialNetworks = JSON.parse(this.user.socialNetwork || '')
        this.form.patchValue({
          name: this.user.name,
          email: this.user.email,
          mobile: this.user.mobile,
          country: this.user.country,
          address: this.user.address,
          facebook: socialNetworks.facebook || '',
          instagram: socialNetworks.instagram || '',
          telegram: socialNetworks.telegram || '',
        });
      } 
    });

    if(this.role==='seller'){
      this.form = new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        mobile: new FormControl(null, [Validators.required, Validators.pattern("[0-9+ ]*")]),
        country: new FormControl(null, [
          Validators.required
        ]),
        address: new FormControl(null, [
          Validators.required
        ]),
        facebook: new FormControl(null),
        instagram: new FormControl(null),
        telegram: new FormControl(null)
      });
    }
    
  }

  submit() {
    const socialNetworksLinks = {
      facebook: this.form.value.facebook,
      instagram: this.form.value.instagram,
      telegram: this.form.value.telegram

    }
    let user: UserUpdate = {
      name: this.form.value.name,
      email: this.form.value.email,
      mobile: this.form.value.mobile,
      country: this.form.value.country,
      address: this.form.value.address,
      socialNetwork: JSON.stringify(socialNetworksLinks)

    };
    this.sellerService.updateSeller(user, this.user.id || '').subscribe(() => {
      this.form.reset();
      this.router.navigate([`/seller`]);
    });
  }
 
}
