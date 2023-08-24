import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user:any;
  name:any;
  blogs: any[] = [];
  filterData: any[] = [];
  
  constructor( private route: ActivatedRoute, private blogService: BlogService,private authService:AuthService) { }

  ngOnInit(): void {
    this.user=this.authService.getLoggedInUser();
    this.name=this.user.username;
    console.log("aa",this.user.username);
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
      this.filterData.splice(blogId, 1); // Remove the blog from the filterData array using splice
      this.blogService.deleteBlog(blogId); // Update localStorage
    }
  }
  
  }



