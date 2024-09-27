import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './AuthService';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'com.inn.cafe-client';
  loginService: LoginService = inject(LoginService);
  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.authService.autoLogin();
  }
}
