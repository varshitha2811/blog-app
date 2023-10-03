import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/blogs'; 

  constructor(private http: HttpClient) { }

  initializeAdmin(): Observable<any> {
    return this.http.post(`${this.baseUrl}/initialize-admin`, null);
  }

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any>('http://localhost:8080/blogs/users', { headers });
  }
  
  updateCanWriteBlog(userId: any, canWriteBlog: boolean): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      headers: headers,
    };
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('canWriteBlog', canWriteBlog.toString());

    return this.http.post(`${this.baseUrl}/update-can-write-blog`, params,options);
  }
  disableProfile(userId: string): Observable<any> {
    const url = `${this.baseUrl}/disableProfile/${userId}`;
    return this.http.put(url, {});
  }

  enableProfile(userId: string): Observable<any> {
    const url = `${this.baseUrl}/enableProfile/${userId}`;
    return this.http.put(url, {});
  }
}
