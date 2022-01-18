import { AdminSellerService } from '../adminSeller.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  file: File | null = null;
  url!: string | ArrayBuffer | null;
  constructor(private sellerService: AdminSellerService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      img: new FormControl(null, [Validators.required]),
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
    let photo = this.file || '';

    this.sellerService.createLogo(photo).subscribe(() => {
      this.form.reset();
      this.url = null;
      this.router.navigate(['/seller']);
    });
  }
}
