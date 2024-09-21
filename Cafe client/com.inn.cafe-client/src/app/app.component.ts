import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataService } from './dataService';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { HeaderComponent } from './header/header.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HttpClientModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DataService, LoginService]
})
export class AppComponent implements OnInit {
  title = 'com.inn.cafe-client';
  loginService: LoginService = inject(LoginService);

  ngOnInit() {
    this.loginService.autoLogin();
  }
}
