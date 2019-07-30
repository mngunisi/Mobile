import {AuthService} from "./../../services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    submitted = false;

    constructor(private authService: AuthService, private platform: Platform, private router: Router,
                private formBuilder: FormBuilder) {
        this.platform.ready().then(() => {
            this.authService.checkToken();
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]})
    }

    login() {
        this.submitted = true;

        this.authService.login(this.loginForm.value).subscribe((res) => {
            if (res.loginStatus != "SUCCESS"){
                return;
            }

            this.router.navigateByUrl('home');
        });
    }
}
