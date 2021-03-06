import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, NavigationExtras} from "@angular/router";
import {MustMatch} from "../../validators/must-match";
import {UserDTO} from "../../auth/auth-response";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    roleId = 0;
    registerForm: FormGroup;
    submitted = false;
    user: UserDTO;
    errors = null;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern(/^0(6\d|7\d|8\d)\d{7}$/)]],
          userPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          roleId: ['', Validators.required]
      }, {
          validator: MustMatch('userPassword', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


    register() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            this.errors = "Error occurred, contact your administrator";
            console.log(this.registerForm.errors);
            return;
        }

        if (this.registerForm.get('roleId').value != 2)
        {
            this.authService.register(this.registerForm.value).subscribe((res) => {
                this.user = res;
                if (this.user.errorMsg != null) {
                    this.f.phoneNumber.setErrors({ alreadyExists: true });
                    return;
                }

                this.router.navigateByUrl('home');
            });
        }
    }

    getCompanyDetails()
    {
        let navigationExtras: NavigationExtras = {
            state: {
                user: this.registerForm.value
            }
        };

        this.router.navigateByUrl('company-details', navigationExtras);
    }
}
