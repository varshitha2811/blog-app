import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;
  name: any;
  blogs: any[] = [];
  filterData: any[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    this.name = this.user.name;
    this.blogs = this.blogService.getStoredData();
    this.filterBlogs();
  }
  filterBlogs() {
    this.filterData = this.blogs
      .map((blog, index) => ({ ...blog, id: index }))
      .filter((blog: { tags: string[]; author: string; title: string }) => {
        const lowercaseSearchTerm = this.name.toLowerCase();
        const lowercaseAuthor = blog.author.toLowerCase();
        return (
          lowercaseAuthor.includes(lowercaseSearchTerm)
        );
      });
  }
  deleteBlog(blogId: number): void {
    const shouldDelete = window.confirm('Are you sure you want to delete this blog?');
    if (shouldDelete) {
      this.filterData.splice(blogId, 1);
      this.blogService.deleteBlog(blogId);
    }
  }
  userlogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}



