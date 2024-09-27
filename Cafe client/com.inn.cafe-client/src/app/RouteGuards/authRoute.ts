import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { map, take } from "rxjs";
import { AuthService } from "../AuthService";

export const canActivate = ((router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService: AuthService = inject(AuthService);
    const route = inject(Router);
    return authService.userSub.pipe(take(1), map(res => {
        if (res) {
            return true;
        } else {
            return route.createUrlTree(['/login']);
        }
    }));
});