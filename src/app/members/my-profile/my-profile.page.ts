import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
    userDetailForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.userDetailForm = this.formBuilder.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern(/^0(6\d|7\d|8\d)\d{7}$/)]],
      });
  }

}
