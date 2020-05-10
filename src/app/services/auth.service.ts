import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {UserDTO} from "../auth/auth-response";
import {User} from "../auth/user";
import {tap} from "rxjs/internal/operators";
import {Business} from "../auth/business";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/api';

    authState  =  new  BehaviorSubject(false);
    headers = new HttpHeaders({'AUTH_API_KEY': 'TESTING1212'});
    userDto: UserDTO;

    constructor(private storage: Storage, private  httpClient: HttpClient, private platform: Platform) {
        this.platform.ready().then(() => {
            this.checkToken();
        });
    }

    register(user: User): Observable<UserDTO> {
        return this.httpClient.post<UserDTO>(`${this.AUTH_SERVER_ADDRESS}/register`, user, {headers: this.headers }).pipe(
            tap(async (res: UserDTO ) => {
                if (res) {
                    await this.storage.set('ACCESS_TOKEN', res.accessToken);
                    await this.storage.set('EXPIRES_IN', res.tokenExpiresIn);
                    this.authState.next(true);
                    this.userDto = res;
                }
            })
        );
    }

    registerCoAndUser(business: Business, user: User): Observable<UserDTO> {
        var ServiceProvider = {'business': business, 'user': user};
        return this.httpClient.post<UserDTO>(`${this.AUTH_SERVER_ADDRESS}/registerServProvider`,
            ServiceProvider, {headers: this.headers }).pipe(
            tap(async (res: UserDTO ) => {
                if (res) {
                    await this.storage.set('ACCESS_TOKEN', res.accessToken);
                    await this.storage.set('EXPIRES_IN', res.tokenExpiresIn);
                    this.authState.next(true);
                    this.userDto = res;
                }
            })
        );
    }

    login(user: User): Observable<UserDTO> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user, {headers: this.headers }).pipe(
            tap(async (res: UserDTO) => {
                if (res && res.errorMsg == null) {
                    await this.storage.set('ACCESS_TOKEN', res.accessToken);
                    await this.storage.set('EXPIRES_IN', res.tokenExpiresIn);
                    this.authState.next(true);
                    this.userDto = res;
                }
            })
        );
    }

    async logout() {
        await this.storage.remove('ACCESS_TOKEN');
        await this.storage.remove('EXPIRES_IN');
        this.authState.next(false);
    }

    isAuthenticated() {
        return this.authState.value;
    }

    checkToken() {
        this.storage.get('ACCESS_TOKEN').then(res => {
            if (res) {
                this.authState.next(true);
            }
        });
    }

    getLoggedInUser() {
        return this.userDto;
    }
}
