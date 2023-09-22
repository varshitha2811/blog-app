import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';
  showLogin: boolean = true;
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router, private SessionServiceService: SessionService) { }

  login() {
    if (this.userName && this.password) {
      
      this.authService.loginUser(this.userName, this.password).subscribe(
        (response) => {
          if (response) {
            localStorage.removeItem("jwt_token");
            localStorage.setItem("jwt_token", response.jwttoken);
            this.SessionServiceService.startSession(response);
            this.router.navigate(['/blogs/home']);
          } else {
            this.errorMessage = 'Invalid credentials', 'Login Failed';
          }
        },
      );
    }
    else {
      this.errorMessage = 'Username and password does not match.';
    }
  }
}
