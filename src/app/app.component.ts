import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    user: any;

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private authService: AuthService,
      private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.user = JSON.parse(localStorage.getItem('currentUser'));

      this.authService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }

    logout() {
      this.authService.logout();
    }

    navigateToDashboard(){
        this.router.navigate(['members', 'dashboard']);
    }

    navigateToUserProfile(){
        this.router.navigate(['members', 'my-profile']);
    }

    navigateToManageEmployees(){
        this.router.navigate(['members', 'employee']);
    }

    navigateToManageServices(){
        this.router.navigate(['members', 'services']);
    }
}
