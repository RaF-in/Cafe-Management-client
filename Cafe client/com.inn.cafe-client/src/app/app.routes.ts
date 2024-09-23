import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HandleSocialLoginComponent } from './handle-social-login/handle-social-login.component';

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
    }
];
