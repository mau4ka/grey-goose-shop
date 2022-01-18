import { UpdateProduct } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { AdminSellerService } from '../adminSeller.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  id!: string;
  product!: UpdateProduct;
  private subscription!: Subscription;
  constructor(
    private router: Router,
    private sellerService: AdminSellerService,
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.subscription = activateRoute.params.subscribe(
      (params) => (this.id = params['id'])
    );
  }

  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe((product) => {
      this.product = product;
      this.form.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category,
        description: this.product.description,
        details: this.product.details,
      });
    });

    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.max(10000),
        Validators.min(0),
      ]),
      category: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      details: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(500),
      ]),
    });
  }

  submit() {
    let product: UpdateProduct = {
      name: this.form.value.name,
      price: this.form.value.price,
      category: this.form.value.category,
      description: this.form.value.description,
      details: this.form.value.details,
      id: this.product.id,
    };

    this.sellerService.updateProduct(product).subscribe(() => {
      this.form.reset();
      this.router.navigate([`/product/${product.id}`]);
    });
  }
}
