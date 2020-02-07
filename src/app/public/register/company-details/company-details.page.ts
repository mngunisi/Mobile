import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
    businessDetForm: FormGroup;
    submitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.businessDetForm = this.formBuilder.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          phoneNo: ['', [Validators.required, Validators.pattern(/^0(6\d|7\d|8\d)\d{7}$/)]],
          addressLine1: ['', [Validators.required, Validators.minLength(6)]],
          addressLine2: [''],
          city: ['', Validators.required],
          postalCode: ['', Validators.required],
          busId: ['', Validators.required]
      });
  }

    // convenience getter for easy access to form fields
    get f() { return this.businessDetForm.controls; }


    register() {
        this.submitted = true;

        if (this.businessDetForm.invalid) {
            return;
        }

        this.authService.registerCoAndUser(this.businessDetForm.value).subscribe((res) => {
            this.router.navigateByUrl('home');
        });
    }
}
