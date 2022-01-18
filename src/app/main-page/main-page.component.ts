import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Seller } from '../shared/interfaces';
import { SellersService } from '../shared/services/sellers.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private sellerService: SellersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  form!: FormGroup;

  loading = true;

  countryData!: Seller[] | null | undefined;
  img!: string;
  country!: string;

  ngOnInit(): void {
    localStorage.removeItem('category');
    this.form = new FormGroup({
      country: new FormControl(''),
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['country']) {
        this.country = params['country'];
        this.setCountry(this.country);
      }
    });
    if (this.country) {
      this.setCountry(this.country);
    }
  }

  setCountry(country: string) {
    this.form.patchValue({
      country: this.country,
    });
    this.loading = true;
    this.sellerService.getSellers(country).subscribe((sellers) => {
      this.countryData = sellers;
      this.loading = false;
    });
    switch (country) {
      case 'Armenia':
        this.img = '/assets/imgMap/armenia.png';
        break;
      case 'Belarus':
        this.img = '/assets/imgMap/belarus.png';
        break;
      case 'Hungary':
        this.img = '/assets/imgMap/hungary.png';
        break;
      case 'Kazakhstan':
        this.img = '/assets/imgMap/kazakhstan.png';
        break;
      case 'Russia':
        this.img = '/assets/imgMap/russia.png';
        break;
      case 'Ukraine':
        this.img = '/assets/imgMap/ukraine.png';
        break;
      default:
        this.countryData = null;
    }
  }

  // findSeller(text: string) {
  //   this.submit();
  //   this.countryData = this.countryData?.filter((el) =>
  //     el.name.toLocaleUpperCase().includes(text.toLocaleUpperCase())
  //   );
  // }

  submit() {
    this.router.navigate(['/'], {
      queryParams: {
        country: this.form.value.country,
      },
    });
  }
}
