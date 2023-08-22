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

  constructor(private blogService: BlogService) { }

  submitBlog(): void {
    const newBlog = {
      title: this.title,
      author: this.author,
      description: this.description,
      tags: this.tags,
      url: this.url
    };

    this.blogService.addBlog(newBlog).subscribe(
      () => {
        alert("data added!")
      });
  }

  resetForm(): void {
    this.title = '';
    this.author = '';
    this.description = '';
    this.tags = [];
    this.url = '';
  }

  onTagChange(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    } else {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }

  showSuccessMessage: boolean = false;
  errorMessage: string = '';
}
