import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../login/login.service";
import { inject } from "@angular/core";
import { map, take } from "rxjs";

export const canActivate = ((router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const loginService: LoginService = inject(LoginService);
    const route = inject(Router);
    return loginService.userSub.pipe(take(1), map(res => {
        if (res) {
            return true;
        } else {
            return route.createUrlTree(['/login']);
        }
    }));
});