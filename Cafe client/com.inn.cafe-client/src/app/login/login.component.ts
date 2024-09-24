import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css', 
})
export class LoginComponent  {

  isLoggedIn = false;
  loggedInEmail = '';
  showLoginForm = false;
  showSignupForm = false;
  loginService: LoginService = inject(LoginService);

  users: Array<{ email: string; password: string }> = [];
  authObs: Observable<any>;
  router: Router = inject(Router);
  isSignupMode: boolean = false;
  

  // Handles showing the login form
  showLogin() {
    this.showLoginForm = true;
    this.showSignupForm = false;
  }


  // Handles showing the signup form
  showSignup() {
    this.isSignupMode = true;
  }

  // Hide both forms and show the buttons again
  hideForms() {
    this.isSignupMode = false;
  }

  // Handles Login form submission
  onLogin(form: any) {
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;
    const username = form.value.loginUserName

    this.authObs = this.loginService.login({
      password: password, email: email,
      username: username
    })

    this.handleLoginOrSignup(true);

    form.reset();
  }

  handleLoginOrSignup(isLogin: boolean) {
    this.authObs.subscribe({
      next: (value) => {
        // This function runs when the observable emits new data.
        console.log(value);  // Handle the data emitted by the observable
        if (isLogin) {
          alert('User loggin in: ' + JSON.stringify(value));
        } else {
          alert('User signed up: ' + JSON.stringify(value));
        }
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
    }

    );
  }

  // Handles Signup form submission
  onSignup(form: any) {
    let singUpParams = {
      email : form.value.signupEmail,
      password : form.value.signupPassword,
      username : form.value.signupUserName,
      roles: "ROLE_USER",
      contactNumber: form.value.signupContactNumber
    }

    const map = new Map();
    for (let key of Object.keys(singUpParams)) {
      map.set(key, singUpParams[key]);
    }

    this.authObs = this.loginService.signup(singUpParams);

    this.handleLoginOrSignup(false);
    form.reset();
  }

  loginWithGoogle() {
    this.loginService.socialLogin();
  }
}
