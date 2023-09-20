import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();
  constructor(private router: Router,private cookieService: CookieService) { }
  startSession(user: any) {
    this.cookieService.set('loggedInUser', JSON.stringify(user),365);
    this.userLoggedInSubject.next(true);    
  }
  endSession() {
    this.cookieService.delete('loggedInUser');
    this.userLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return this.cookieService.check('loggedInUser');
  }
}

