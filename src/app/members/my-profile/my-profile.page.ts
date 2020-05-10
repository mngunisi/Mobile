import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserDTO} from "../../auth/auth-response";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
    userDetailForm: FormGroup;
    userDto: UserDTO;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
      this.userDto = authService.getLoggedInUser();
  }

  ngOnInit() {
      this.userDetailForm = this.formBuilder.group({
          name: [this.userDto.name, Validators.required],
          surname: [this.userDto.surname, Validators.required],
          phoneNumber: [this.userDto.phoneNumber, [Validators.required, Validators.pattern(/^0(6\d|7\d|8\d)\d{7}$/)]],
      });
  }

}
