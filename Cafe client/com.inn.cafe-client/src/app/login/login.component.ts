import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoggedIn = false;
  loggedInEmail = '';
  showLoginForm = false;
  showSignupForm = false;

  users: Array<{ email: string; password: string }> = [];

  // Handles showing the login form
  showLogin() {
    this.showLoginForm = true;
    this.showSignupForm = false;
  }

  // Handles showing the signup form
  showSignup() {
    this.showSignupForm = true;
    this.showLoginForm = false;
  }

  // Hide both forms and show the buttons again
  hideForms() {
    this.showLoginForm = false;
    this.showSignupForm = false;
  }

  // Handles Login form submission
  onLogin(form: any) {
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      this.isLoggedIn = true;
      this.loggedInEmail = email;
      alert('Login successful!');
      this.hideForms();
    } else {
      alert('Invalid credentials. Please try again.');
    }
    form.reset();
  }

  // Handles Signup form submission
  onSignup(form: any) {
    const email = form.value.signupEmail;
    const password = form.value.signupPassword;

    const existingUser = this.users.find((user) => user.email === email);

    if (existingUser) {
      alert('User with this email already exists!');
    } else {
      this.users.push({ email, password });
      alert('Signup successful!');
      this.hideForms();
    }
    form.reset();
  }

  // Logout function
  logout() {
    this.isLoggedIn = false;
    this.loggedInEmail = '';
    this.hideForms();
  }
}
