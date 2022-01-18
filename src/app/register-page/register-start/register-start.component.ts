import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-register-start',
  templateUrl: './register-start.component.html',
  styleUrls: ['./register-start.component.scss']
})
export class RegisterStartComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onRegisterSeller() {
    this.router.navigate(['seller'], {relativeTo: this.route})
  }

  onRegisterBuyer() {
    this.router.navigate(['buyer'], {relativeTo: this.route})
  }

}
