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
  displayName:any;
  displayUserName:any;
  blogs: any[] = [];
  filterData: any[] = [];
  
  constructor( private route: ActivatedRoute, private blogService: BlogService,private authService:AuthService) { }

  ngOnInit(): void {
    this.user=this.authService.getLoggedInUser();
    this.displayName=this.user.name;
    this.displayUserName=this.user.username;
    this.blogs = this.blogService.getStoredData();
    this.filterBlogs();
    console.log(this.filterData);
  }
  filterBlogs() {
    this.filterData = this.blogs
      .map((blog, index) => ({ ...blog, id: index }))
      .filter((blog: { tags: string[]; author: string; title: string }) => {
         const Author = blog.author;
        return (
          Author.includes(this.displayUserName) 
        );
      });
  }

  deleteBlog(index: number): void {
    const shouldDelete = window.confirm('Are you sure you want to delete this blog?');
    if (shouldDelete) {
      this.blogService.deleteBlog(index);
      this.filterData = this.filterData.filter((blog: any) => blog.id !== index);
  }
  
}
}
