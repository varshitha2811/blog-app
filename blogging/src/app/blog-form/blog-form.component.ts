import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent {
  title: string = '';
  author: string = '';
  description: string = '';
  tags: string[] = [];
  url: string = '';
  time: Date | undefined;
  isSuccess: boolean = false;

  constructor(private blogService: BlogService) { }

  submitBlog(): void {
    const newBlog = {
      title: this.title,
      author: this.author,
      description: this.description,
      tags: this.tags,
      url: this.url,
      time: new Date(),
    };
    console.log('New Blog:', newBlog);
    this.blogService.addBlog(newBlog);
    this.isSuccess = true;
    console.log('Stored Blogs:', this.blogService.getStoredData());

    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
    this.author = '';
    this.description = '';
    this.tags = [];
    this.url = '';
    this.time = undefined;
  }
  onTagChange(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    } else {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }
}
