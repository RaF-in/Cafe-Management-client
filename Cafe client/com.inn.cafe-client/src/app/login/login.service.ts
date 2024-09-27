import { inject, Injectable } from "@angular/core";
import { DataService } from "../dataService";
import { loginRequestDTO } from "../RequestDTO/loginRequestDTO";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { loginResponseDTO } from "../ResponseDTO/loginResponseDTO";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../AuthService";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    dataService: DataService = inject(DataService);
    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);
    logoutTime: any;
    cookieService: CookieService = inject(CookieService);

    login(params: loginRequestDTO) {
        return this.dataService.login(params).pipe(catchError(err => this.handleError(err)), tap(resp => {
            let response = (resp) as any;
            if (response && response.data) {
                this.authService.emitUserLoggedIn(response.data);
            }
          }));
    }

    signup(params ) {
        return this.dataService.signup(params).pipe(catchError(err => this.handleError(err)), tap(resp => {
            let response = (resp) as any;
            if (response && response.data) {
                this.authService.emitUserLoggedIn(response.data);
            }
          }))
    }

    getSocialLoginUserData() {
        return this.dataService.getSocialLoginUserData().pipe(catchError(err => this.handleError(err)), tap(resp => {
            let response = (resp) as any;
            if (response && response.data) {
                this.authService.emitUserLoggedIn(response.data);
            }
          }))
    }

    handleError(err: any): any {
        throwError( () => err);
    }

    socialLogin() {
        this.dataService.socialLogin();
    }
}