import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataService } from './dataService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { HeaderComponent } from './header/header.component';
import { take } from 'rxjs';
import { CafeUsersService } from './cafe-users/cafe-users.service';
import { AuthInterceptorService } from './AuthInterceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HttpClientModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DataService, LoginService, CafeUsersService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class AppComponent implements OnInit {
  title = 'com.inn.cafe-client';
  loginService: LoginService = inject(LoginService);

  ngOnInit() {
    this.loginService.autoLogin();
  }
}
