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
    AUTH_SERVER_ADDRESS:  string  =  'http://192.168.8.102:8080//';
    authSubject  =  new  BehaviorSubject(false);

  constructor(private storage: Storage, private  httpClient:  HttpClient, private platform: Platform) {
  }

    register(user: User): Observable<UserDTO> {
      return this.httpClient.post<UserDTO>(this.AUTH_SERVER_ADDRESS + 'register', user);

        /*  return this.httpClient.post<UserDTO>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
            tap(async (res: UserDTO) => {

                if (res.user) {
                    await this.storage.set("ACCESS_TOKEN", res.user.access_token);
                    await this.storage.set("EXPIRES_IN", res.user.expires_in);
                    this.authSubject.next(true);
                }
            })
        );*/
    }

    /*login(user: User): Observable<UserDTO> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
            tap(async (res: UserDTO) => {

                if (res.user) {
                    await this.storage.set("ACCESS_TOKEN", res.user.access_token);
                    await this.storage.set("EXPIRES_IN", res.user.expires_in);
                    this.authSubject.next(true);
                }
            })
        );
    }

    async logout() {
        await this.storage.remove("ACCESS_TOKEN");
        await this.storage.remove("EXPIRES_IN");
        this.authSubject.next(false);
    }

    isLoggedIn() {
        return this.authSubject.asObservable();
    }*/
    isAuthenticated() {
        return false;
    }

    logout() {
        return null;
    }

    login() {
        return null;
    }
}
