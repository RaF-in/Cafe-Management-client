import { inject } from "@angular/core";
import { DataService } from "../dataService";
import { loginRequestDTO } from "../RequestDTO/loginRequestDTO";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { loginResponseDTO } from "../ResponseDTO/loginResponseDTO";


export class LoginService {
    dataService: DataService = inject(DataService);
    userSub: BehaviorSubject<loginResponseDTO> = new BehaviorSubject<loginResponseDTO>(null);
    router: Router = inject(Router);
    logoutTime: any;

    login(params: loginRequestDTO) {
        return this.dataService.login(params).pipe(catchError(err => this.handleError(err)), tap(resp => {
            let response = (resp) as any;
            if (response && response.data) {
                this.emitUserLoggedIn(response.data);
            }
          }));
    }

    signup(params ) {
        return this.dataService.signup(params).pipe(catchError(err => this.handleError(err)), tap(resp => {
            let response = (resp) as any;
            if (response && response.data) {
                this.emitUserLoggedIn(response.data);
            }
          }))
    }

    handleError(err: any): any {
        throwError( () => err);
    }

    logout() {
        this.userSub.next(null);
        localStorage.clear();
        this.router.navigateByUrl("/login");
        clearTimeout(this.logoutTime);
    }

    emitUserLoggedIn(data) {
        this.userSub.next(data);
        this.autoLogout(new Date(data.expiresIn).getTime() - new Date().getTime());
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
    }

    autoLogin() {
        let userData: loginResponseDTO = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            return;
        }
        if (userData && new Date(userData.expiresIn) > new Date) {
            this.userSub.next(userData);
            this.autoLogout(new Date(userData.expiresIn).getTime() - new Date().getTime());
        }
    }

    autoLogout(time) {
        this.logoutTime = setTimeout(() => {
            this.logout();
        }, time)
    }
}