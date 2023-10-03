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
  // //new down
  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`http://localhost:8080/blogs/users`).pipe(
  //     tap(users => console.log(users)),
  //     catchError((error) => {
  //       console.error('Error getting users:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  
  // getAdminDetails(): Observable<any> {
  //   return this.http.get<any>(`${this.authUrl}/adminprofile`);
  // }
  // disableProfile(username: string): Observable<any> {
  //   return this.http.post<any>(`${this.authUrl}/admin/disable-profile/${username}`, null);
  // }
  
  // enableProfile(username: string): Observable<any> {
  //   return this.http.post<any>(`${this.authUrl}/admin/enable-profile/${username}`, null);
  // }
  
  // disableWriteBlog(username: string): Observable<any> {
  //   return this.http.post<any>(`${this.authUrl}/admin/disable-write-blog/${username}`, null);
  // }
  
  // enableWriteBlog(username: string): Observable<any> {
  //   return this.http.post<any>(`${this.authUrl}/admin/enable-write-blog/${username}`, null);
  // }
  }
  


