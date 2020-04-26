import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    date: string;
    type: 'string';


    constructor(private authService: AuthService, private menu: MenuController) { }

    ngOnInit() {
    }

    logout() {
    this.authService.logout();
    }

    onChange($event) {
        console.log($event);
    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    openEnd() {
        this.menu.open('end');
    }

    openCustom() {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
    }
}
