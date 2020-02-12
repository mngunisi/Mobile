import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../auth/user";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
    businessDetForm: FormGroup;
    submitted = false;
    user: User;
    busId = 0;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute)
  {
      this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
              this.user = this.router.getCurrentNavigation().extras.state.user;
          }
      });
  }

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
            //todo: show user error message
            return;
        }

        this.authService.registerCoAndUser(this.businessDetForm.value, this.user).subscribe((res) => {
            this.router.navigateByUrl('home');
        });
    }
}
