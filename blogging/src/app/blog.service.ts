import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
export interface Comment {
  name: string;
  comment: string;
}
export interface blog {
  id?:any;
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
  constructor(private http:HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/home`);
  }
  private commentsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  comments$: Observable<any[]> = this.commentsSubject.asObservable();
  
  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
    
  }
  addBlog(newBlog: blog): Observable<blog> {
    return this.http.post<blog>(`${this.apiUrl}/add`, newBlog);
  }
  deleteBlog(index: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${index}`);
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
  getBlogsByTitle(title: string): Observable<blog[]> {
    const storedData = this.getStoredData();
    const filteredBlogs = storedData.filter(blog => blog.title.toLowerCase().includes(title.toLowerCase()));
    return new Observable<blog[]>(observer => {
      observer.next(filteredBlogs);
      observer.complete();
    });
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
  updateBlog(blogIndex: number, updatedBlog: blog): Observable<blog> {
    return this.http.put<blog>(`${this.apiUrl}/update-blog/${blogIndex}`, updatedBlog);
  }
  searchBlogs(searchTerm: string): Observable<blog[]> {
    return this.http.get<blog[]>(`${this.apiUrl}/search/${searchTerm}`);
  }
  
}
