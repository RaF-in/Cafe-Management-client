import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HandleSocialLoginComponent } from './handle-social-login/handle-social-login.component';
import { CafeUsersComponent } from './cafe-users/cafe-users.component';
import { canActivate } from './RouteGuards/authRoute';

export const routes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'handleSocialLogin',
        component: HandleSocialLoginComponent
    },
    {
        path: 'getAllusers',
        // lazy load
        loadComponent: ()=> import('./cafe-users/cafe-users.component').then(com => com.CafeUsersComponent),
        canActivate: [canActivate]
    }
];
