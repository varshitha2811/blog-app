import { Component, OnInit , HostListener } from '@angular/core';
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

  
 

  
}
