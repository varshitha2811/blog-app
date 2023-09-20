import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface User {
  name: string;
  userName: string;
  password: string;
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

  constructor(private http: HttpClient) { }

  createUser(name: string, userName: string, password: string): Observable<any> {
    const user = { name, userName, password };
    return this.http.post<any>(`${this.authUrl}/create-user`, user).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  loginUser(userName: string, password: string): Observable<any> {
    const user = { userName, password };
    return this.http.post<User>(`${this.authUrl}/login`, user).pipe(
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
    return this.http.get<any>(`http://localhost:8080/current-user`,{headers});
  }
}
