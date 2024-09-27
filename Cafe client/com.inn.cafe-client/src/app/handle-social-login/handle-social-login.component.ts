import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login/login.service';
import { loginResponseDTO } from '../ResponseDTO/loginResponseDTO';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-handle-social-login',
  standalone: true,
  imports: [],
  templateUrl: './handle-social-login.component.html',
})
export class HandleSocialLoginComponent implements OnInit {
  cookieService: CookieService = inject(CookieService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  ngOnInit(): void {
    const email = this.cookieService.get('email');
    const jwtToken = this.cookieService.get('jwtToken');
    const expiresInCookie = this.cookieService.get('expiresIn');

    let expiresIn: Date = null;
    if (expiresInCookie) {
      const decodedDateString = decodeURIComponent(expiresInCookie);

      // Convert the decoded string to a JavaScript Date object
      expiresIn = new Date(decodedDateString);
    }
    if (email && jwtToken && expiresIn) {
      let resp: loginResponseDTO = {};
      resp.email = email;resp.jwtToken = jwtToken;resp.expiresIn = expiresIn;
      this.authService.emitUserLoggedIn(resp);
      this.router.navigateByUrl('home');
    }
  }

}
