import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-social-login-handle',
  standalone: true,
  imports: [],
  templateUrl: './social-login-handle.component.html',
})
export class SocialLoginHandleComponent implements OnInit {

  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  
  ngOnInit(): void {
    this.loginWithGoogle();
  }

  loginWithGoogle() {
   this.loginService.getSocialLoginUserData().subscribe({
    next: (value) => {
      // This function runs when the observable emits new data.
      console.log(value);  // Handle the data emitted by the observable
      alert('User loggin in: ' + JSON.stringify(value));
      this.router.navigateByUrl('home');
    },
    error: (err) => {
      // This function runs if there's an error.
      console.error(err);  // Handle the error
    },
    complete: () => {
      // This function runs when the observable completes.
      console.log('Observable completed');
    }
  });
  }

}
