import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  blogs: any[] = [];
  newBlogForm: any;
  currentIndex = 0;
  visibleItems = 4;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }

  addNewBlog(newBlog: any): void {
    this.blogService.addBlog(newBlog).subscribe(updatedBlogs => {
      this.blogs = updatedBlogs;
    });
  }

  deleteBlog(id: number): void {
    this.blogService.deleteBlog(id).subscribe(updatedBlogs => {
      this.blogs = updatedBlogs;
    });
  }

  moveCarousel(step: number) {
    const maxIndex = this.blogs.length - this.visibleItems;
    this.currentIndex = Math.max(0, Math.min(this.currentIndex + step, maxIndex));
  }

  getCardClasses(index: number): string {
    const position = index - this.currentIndex;
    const baseClasses = 'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';
    
    if (position === 0) {
      return baseClasses;
    } else if (position < 0) {
      return `${baseClasses} hidden sm:block`;
    } else {
      return `${baseClasses} hidden md:block`;
    }
  }
}
