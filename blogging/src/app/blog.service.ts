import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
export interface Comment {
  name: string;
  comment: string;
}
export interface blog {
  id?: any;
  title: string;
  author: string;
  description: string[];
  tags: Array<string>;
  url: string;
  time: string;
  comments: object[];
  userName: string;
}
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private storageKey = 'blogData';
  private apiUrl = 'http://localhost:8080/blogs';
  constructor(private http: HttpClient) { }
  getApiUrl(): string {
    return this.apiUrl;
  }
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/home`);
  }
  fetchByTags(searchedTag: string): Observable<blog[]> {
    return this.http.get<any[]>(`${this.apiUrl}/home/tag/${searchedTag}`);
  }
  fetchByauthor(searchedTag: string): Observable<blog[]> {
    return this.http.get<any[]>(`${this.apiUrl}/home/author/${searchedTag}`);
  }
  private commentsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  comments$: Observable<any[]> = this.commentsSubject.asObservable();
  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  addBlog(newBlog: blog): Observable<blog> {
    const token = localStorage.getItem('jwt_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      headers: headers,
    };
    return this.http.post<blog>(`${this.apiUrl}/add`, newBlog,options);
  }
  getUserProfile(author: string): Observable<any> {
    const params = { author };
    return this.http.get(`${this.apiUrl}/profile`, { params });
  }
  filterBlogsByAuthorAndUserName(author: string, userName: string): Observable<blog[]> {
    const params = new HttpParams()
      .set('author', author)
      .set('userName', userName);
    return this.http.get<blog[]>(`${this.apiUrl}/filter`, { params });
  }
  getStoredData(): any[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
  updateComments(blogIndex: String, comments: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-comments/${blogIndex}`, { comments });
  }
  getComments(blogIndex: String): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comments/${blogIndex}`);
  }
  addComment(blogId: string, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-comment/${blogId}`, comment)
    
      .pipe(
        catchError((error) => {
          console.error('Error adding comment:', error);
          return throwError('Error adding comment. Please try again later.');
        })
      );
  }
  updateBlog(id: string, updatedBlog: any): Observable<any> {
    console.log(updatedBlog);
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<any>(url, updatedBlog);
  }
  deleteBlog(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  searchBlogs(searchTerm: string): Observable<blog[]> {
    return this.http.get<blog[]>(`${this.apiUrl}/search/${searchTerm}`);
  }
  deleteComment(blogId: string, commentIndex: number): Observable<any> {
    const url = `${this.apiUrl}/delete-comment/${blogId}/${commentIndex}`;
    return this.http.delete(url);
  }
}
