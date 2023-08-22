import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
})
export class BlogFormComponent {
  author: string = '';
  tags: string[] = ['Technology', 'Lifestyle', 'Travel', 'Food'];
  selectedTags: string[] = [];
  title: string = '';
  content: string = '';

  submitBlog() {
    const blog = {
      author: this.author,
      tags: this.selectedTags,
      title: this.title,
      content: this.content,
    };
    
    // Store in local storage (you can replace this with your storage logic)
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    
    this.clearForm();
  }

  clearForm() {
    this.author = '';
    this.selectedTags = [];
    this.title = '';
    this.content = '';
  }
}
