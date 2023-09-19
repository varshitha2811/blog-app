import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';

interface User {
  name: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
    private blogService: BlogService
  ) { }

  signUp() {
    if (this.name && this.username && this.password) {
      if (this.password.length < 8) {
        this.passwordError = true;
      } else {
        this.authService.signUp(this.name, this.username, this.password);
        this.name = '';
        this.username = '';
        this.password = '';
        this.passwordError = false;
        this.errorMessage = '';
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

