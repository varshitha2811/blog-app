import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  name: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordError: boolean = false;
  errorStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private blogService: BlogService,
  ) { }

  signUp() {
    if (this.name && this.username && this.password) {
      const existingUser = this.authService.getUserByUsername(this.username);
      if (existingUser) {
        this.errorMessage = 'Username already exists. Please choose a different username.';
        this.errorStatus = true;
      }
      else if (this.password.length < 8) {
        this.passwordError = true;
      } else {
        this.authService.signUp(this.name, this.username, this.password);
        this.router.navigate(['/login']);
      }
    } else {
      this.errorMessage = 'Username and password are required.';
    }
  }
  resetPasswordError() {
    this.passwordError = false;
    this.errorStatus = false;
  }
}

