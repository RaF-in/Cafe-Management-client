import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { exhaustMap, pipe, take } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    this.loginService.userSub.subscribe(res => {
      if (res) {
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
      }
    })
  }

  logout() {
    this.loginService.logout();
  }

}
