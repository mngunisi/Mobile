import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {UserDTO} from "../auth/auth-response";
import {User} from "../auth/user";
import {tap} from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    AUTH_SERVER_ADDRESS: string = 'http://localhost:8080//';
    authState  =  new  BehaviorSubject(false);

    constructor(private storage: Storage, private  httpClient: HttpClient, private platform: Platform) {
        this.platform.ready().then(() => {
            this.checkToken();
        });
    }

    register(user: User): Observable<UserDTO> {
        return this.httpClient.post<UserDTO>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
            tap(async (res: UserDTO ) => {
                if (res) {
                    await this.storage.set('ACCESS_TOKEN', res.accessToken);
                    await this.storage.set('EXPIRES_IN', res.tokenExpiresIn);
                    this.authState.next(true);
                }
            })
        );
    }

    login(user: User): Observable<UserDTO> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
            tap(async (res: UserDTO) => {
                if (res && res.errorMsg == null) {
                    await this.storage.set('ACCESS_TOKEN', res.accessToken);
                    await this.storage.set('EXPIRES_IN', res.tokenExpiresIn);
                    this.authState.next(true);
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
}
