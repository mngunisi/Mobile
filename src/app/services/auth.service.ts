import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {UserDTO} from "../auth/auth-response";
import {User} from "../auth/user";


const TOKEN_KEY = 'SB_AUTH_TOKEN';
const EXPIRES_IN = "SB_TOKEN_EXPIRY";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    AUTH_SERVER_ADDRESS: string = 'http://localhost:8080//';
    authState  =  new  BehaviorSubject(false);
    loggedUser: UserDTO;

    constructor(private storage: Storage, private  httpClient: HttpClient, private platform: Platform) {
        this.platform.ready().then(() => {
            this.checkToken();
        });
    }

    register(user: User): Observable<UserDTO> {
        return this.httpClient.post<UserDTO>(this.AUTH_SERVER_ADDRESS + 'register', user);
    }

    login(user: User): Observable<UserDTO>  {
        this.httpClient.post<UserDTO>(this.AUTH_SERVER_ADDRESS + 'login', user).subscribe((res) => {
            if (res.loginStatus == "SUCCESS"){
                this.setLoggedInProperties(res);
                this.loggedUser = res;
            }
        });

        return this.loggedUser;
    }

    setLoggedInProperties(loggedInUser: UserDTO){
        this.storage.set(TOKEN_KEY, loggedInUser.accessToken);
        this.storage.set(EXPIRES_IN, loggedInUser.expiresIn);
        this.authState.next(true);
    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authState.next(false);
        });
    }

    isAuthenticated() {
        return this.authState.value;
    }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authState.next(true);
            }
        });
    }

}
