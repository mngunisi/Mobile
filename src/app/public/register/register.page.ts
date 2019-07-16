import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {MustMatch} from "../../validators/must-match";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;
    submitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern(/^0(6\d|7\d|8\d)\d{7}$/)]],
          userPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      }, {
          validator: MustMatch('userPassword', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  register() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

    this.authService.register(this.registerForm.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }

}
