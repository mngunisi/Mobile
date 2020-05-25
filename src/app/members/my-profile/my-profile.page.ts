import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
    userDetailForm: FormGroup;
    user: any;

  constructor(private formBuilder: FormBuilder) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.userDetailForm = this.formBuilder.group({
          name: [this.user.name, Validators.required],
          surname: [this.user.surname, Validators.required],
          phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern(/^0(6\d|7\d|8\d)\d{7}$/)]]
      });
  }

}
