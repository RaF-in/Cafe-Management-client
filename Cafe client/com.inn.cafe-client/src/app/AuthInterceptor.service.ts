import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './AuthService';
import { inject } from '@angular/core';
import { take, exhaustMap } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('Interceptor called');
    const authService: AuthService = inject(AuthService);
    return authService.userSub.pipe(take(1), exhaustMap(user => {
        if (user && user.jwtToken) {
            const token = user.jwtToken;
            const httpReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Set the Authorization header
                }
            });
            console.log(httpReq)
            return next(httpReq);
        } else {
            return next(req);
        }

    }))
};
