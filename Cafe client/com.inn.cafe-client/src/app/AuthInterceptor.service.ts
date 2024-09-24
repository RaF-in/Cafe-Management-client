import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { LoginService } from "./login/login.service";
import { inject } from "@angular/core";

export class AuthInterceptorService implements HttpInterceptor{
    loginService: LoginService = inject(LoginService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.loginService.userSub.pipe(take(1), exhaustMap(user => {
            const httpReq = req.clone({
                params: new HttpParams().set('Authorization', "Bearer " + user.jwtToken)
            });
            return next.handle(httpReq);
        }))
    }

}