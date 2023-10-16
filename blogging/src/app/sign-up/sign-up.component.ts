import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { SessionService } from '../session-service.service';
import { UserProfile, UserProfileService } from '../user-profile.service';
interface User {
  name: string;
  userName: string;
  password: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  name: string = '';
  userName: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordError: boolean = false;
  errorStatus: boolean = false;
  successMessage: string = '';
  formSubmitted:boolean=false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private blogService: BlogService,
    private sessionService: SessionService,
    private userProfileService:UserProfileService
  ) { }
  signUp() {
    this.formSubmitted = true;
    if (!this.name || !this.userName || !this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    if (this.name && this.userName && this.password) {
      if (this.password.length < 8) {
        this.passwordError = true;
      } else {
        this.authService.createUser(this.name, this.userName, this.password).subscribe(
          (response) => {
            this.sessionService.startSession(response);
            this.successMessage = 'User created successfully';
            const nameParts = this.name.split(" ");
            const userProfile: UserProfile = {
              FirstName:nameParts[0],
              LastName:nameParts.slice(1).join(" "),
              email: '',
              userName: this.userName,
              profilePicture: null,
            };
            this.userProfileService.createUserProfile(userProfile).subscribe(
              () => {
                console.log('User profile created successfully');
              },
              (error: any) => {
                console.error('Error creating user profile:', error);
              }
            );
          }
        );
        this.name = '';
        this.userName = '';
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