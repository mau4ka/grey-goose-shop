import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdate } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { BuyerService } from '../buyer.service';

@Component({
  selector: 'app-update-buyer',
  templateUrl: './update-buyer.component.html',
  styleUrls: ['./update-buyer.component.scss']
})
export class UpdateBuyerComponent implements OnInit {

  form!: FormGroup;
  message!: string;
  id!: string;
  role: string = localStorage.getItem('grey-role') || 'buyer';
  user!: UserUpdate;
  constructor(
    private router: Router,
    private buyerService: BuyerService,
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    
  }

  ngOnInit(): void {
    
    

    
      this.form = new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        country: new FormControl(null, [
          Validators.required
        ]),
      });

      this.buyerService.getUserInfo().subscribe((user) => {
      
      this.user = user;
      if (this.role === 'buyer') {
        
        this.form.patchValue({
          name: this.user.name,
          email: this.user.email,
          country: this.user.country,
        });
      } 
    });
    
  }

  submit() {
    let user: UserUpdate = {
      name: this.form.value.name,
      email: this.form.value.email,
      country: this.form.value.country,

    };
    this.buyerService.updateBuyer(user, this.user.id || '').subscribe(() => {
      this.form.reset();
      this.router.navigate([`/buyer`]);
    });
  }
}
