import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

// export interface User {
//   profileEnabled: boolean;
//   name: string;
//   userName: string;
//   password: string;
// }
export interface User {
  profileEnabled: boolean;
  name: string;
  userName: string;
  password: string;
  roles: string[];
}

 export interface UserInfo {
  username: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getuser(): any {
    return null;
  }
  token: string = localStorage.getItem("jwt_token") || "";  
  loginSuccess: Boolean = false;
  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient,private router:Router) { }

  createUser(name: string, userName: string, password: string): Observable<any> {
    const user = { name, userName, password };
    return this.http.post<any>(`${this.authUrl}/create-user`, user).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // loginUser(userName: string, password: string): Observable<any> {
  //   const user = { userName, password };
  //   return this.http.post<User>(`${this.authUrl}/login`, user).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         return throwError('Invalid username or password');
  //       }
  //       return throwError(error);

  //     })
  //   );
  // }
  loginUser(userName: string, password: string): Observable<any> {
    const user = { userName, password };
    return this.http.post<User>(`${this.authUrl}/login`, user).pipe(
      tap((user) => {
        if (user && user.roles && user.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/blog/user-management']); 
        } else {
          this.router.navigate(['blog/profile']); 
        }
      }),

      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError('Invalid username or password');
        }
        return throwError(error);
      })
    );
  }
  
  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    console.log(headers);
    return this.http.get<any>(`http://localhost:8080/current-user`,{headers});
  }
  isAdmin(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => user && user.roles && user.roles.includes('ROLE_ADMIN'))
    );
  }
  }
  


