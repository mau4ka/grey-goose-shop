import { AdminSellerService } from '../adminSeller.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  file: File | null = null;
  url!: string | ArrayBuffer | null;

  constructor(private router: Router, private sellerService: AdminSellerService) {}

  ngOnInit(): void {
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
      category: new FormControl('', [Validators.required]),
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
      photo: new FormControl(null, [Validators.required]),
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.file = event.target.files[0];
      reader.onload = (event) => {
        this.url = event.target!.result;
      };
    }
  }

  submit() {
    let product: AddProduct = {
      name: this.form.value.name,
      price: this.form.value.price,
      category: this.form.value.category,
      description: this.form.value.description,
      details: this.form.value.details,
      photo: this.file || '',
    };

    this.sellerService.createProduct(product).subscribe(() => {
      this.form.reset();
      this.url = null;
      this.router.navigate(['/seller']);
    });
  }

  decimalFilter(event: any) {
   const reg = /^\d+([.]\d{0,2})?$/;
   let input = event.target.value + String.fromCharCode(event.charCode);
   
   if (!reg.test(input)) {
       event.preventDefault();
   }
  }
}
