import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { loginResponseDTO } from "./ResponseDTO/loginResponseDTO";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export class AuthService {
    router: Router = inject(Router);
    logoutTime: any;
    cookieService: CookieService = inject(CookieService);
    userSub: BehaviorSubject<loginResponseDTO> = new BehaviorSubject<loginResponseDTO>(null);
    logout() {
        this.userSub.next(null);
        localStorage.clear();
        this.router.navigateByUrl("/login");
        clearTimeout(this.logoutTime);
        this.clearCafeCookies();
    }

    clearCafeCookies() {
        this.cookieService.delete('jwtToken');  // JWT token
        this.cookieService.delete('email');
        this.cookieService.delete('expiresIn');
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