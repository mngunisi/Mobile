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
            userPassword: ['', Validators.required]});
    }

    login(form) {
        this.submitted = true;

        this.authService.login(form.value).subscribe((res) => {

            if (this.authService.isAuthenticated())
            {
                this.router.navigateByUrl('home');
            }

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
}
