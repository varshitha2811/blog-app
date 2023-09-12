import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
interface Comment {
  name: string;
  comment: string;
}
export interface blog {
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
  constructor(private http:HttpClient) {    
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/home`);
  }
  private storedData: any[] = this.getStoredData();
  private commentsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  comments$: Observable<any[]> = this.commentsSubject.asObservable();

  addBlog(newBlog: blog): Observable<blog> {
    return this.http.post<blog>(`${this.apiUrl}/add`, newBlog);
  }

  getStoredData(): any[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
  deleteBlog(index: number): void {
    const storedData = this.getStoredData();

    if (index >= 0 && index < storedData.length) {
      storedData.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    }
  }
  updateComments(blogIndex: number, comments: any): void {
    const storedData = this.getStoredData();
    storedData[blogIndex].comments = comments;
    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    this.commentsSubject.next(comments);
  }
  getComments(blogIndex: number): Observable<any[]> {
    const storedData = this.getStoredData();
    const comments = storedData[blogIndex].comments || {};
    this.commentsSubject.next(comments);
    return this.comments$;
  }

  getBlogsByTitle(title: string): Observable<blog[]> {
    const storedData = this.getStoredData();
    const filteredBlogs = storedData.filter(blog => blog.title.toLowerCase().includes(title.toLowerCase()));
    return new Observable<blog[]>(observer => {
      observer.next(filteredBlogs);
      observer.complete();
    });
  }
  updateBlog(blogIndex: number, updatedBlog: any): void {
    const storedData = this.getStoredData();
    storedData[blogIndex] = updatedBlog;
    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
  }
  
  deleteComment(blogIndex: number, commentIndex: number): void {
    const storedData = this.getStoredData();
    if (storedData[blogIndex]?.comments instanceof Array) {
      storedData[blogIndex].comments.splice(commentIndex, 1);
      const updatedComments = [...storedData[blogIndex].comments];
      storedData[blogIndex].comments = updatedComments;

      localStorage.setItem(this.storageKey, JSON.stringify(storedData));
      this.updateComments(blogIndex, updatedComments);
    }
  }
  addComment(blogIndex: number, comment: Comment): void {
    const storedData = this.getStoredData();
    const blogEntry = storedData[blogIndex];
    if (!Array.isArray(blogEntry.comments)) {
      blogEntry.comments = [];
    }
    const existingCommentIndex = blogEntry.comments.findIndex((existingComment: Comment) => {
      return existingComment.name === comment.name && existingComment.comment === comment.comment;
    });
    if (existingCommentIndex === -1) {
      blogEntry.comments.push(comment);
      localStorage.setItem(this.storageKey, JSON.stringify(storedData));
      this.updateComments(blogIndex, blogEntry.comments);
    }
  }
}
