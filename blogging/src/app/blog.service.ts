import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private jsonDataUrl = 'assets/blogs.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonDataUrl);
  }

  addBlog(newBlog: any): Observable<any[]> {
    return this.http.post<any[]>(this.jsonDataUrl, newBlog);
  }

  deleteBlog(id: number): Observable<any[]> {
    const deleteUrl = `${this.jsonDataUrl}/${id}`;
    return this.http.delete<any[]>(deleteUrl);
  }
}
