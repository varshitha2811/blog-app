// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.scss']
// })
// export class SignUpComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private authService: AuthService,private router:Router) {}

//   signUp() {
//     if(this.username && this.password){
//       this.authService.signUp(this.username, this.password);
//       this.router.navigate(['/login']);
//     }
    
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  name: string='';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    if (this.name && this.username && this.password) {
      const existingUser = this.authService.getUserByUsername(this.username);
      if (existingUser) {
        this.errorMessage = 'Username already exists. Please choose a different username.';
      } else {
        this.authService.signUp(this.name,this.username, this.password);
        this.router.navigate(['/login']);
      }
    } else {
      this.errorMessage = 'Username and password are required.';
    }
  }
}

