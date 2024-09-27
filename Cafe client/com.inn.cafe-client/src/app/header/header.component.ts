import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogedIn: boolean = false;
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.userSub.subscribe(res => {
      if (res) {
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
      }
    })
  }

  logout() {
    this.authService.logout();
  }

  getUsers() {
    this.router.navigateByUrl('getAllusers');
  }

}
