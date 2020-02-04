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
    isLoginError = false;
    error = " ";

    constructor(private authService: AuthService, private platform: Platform, private router: Router,
                private formBuilder: FormBuilder) {
        this.platform.ready().then(() => {
            this.authService.checkToken();
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            userPassword: ['', Validators.required]});
    }

    login(form) {
        this.submitted = true;

        this.authService.login(form.value).subscribe((res) => {

            if (this.authService.isAuthenticated())
            {
                this.isLoginError = false;
                this.router.navigateByUrl('home');
            }
            else if(res.errorMsg != null)
            {
                this.isLoginError = true;
                this.error = res.errorMsg;
                form.reset();
            }
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
}
