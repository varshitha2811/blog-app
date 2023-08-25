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
  user:any;
  loginName:string="";
  loginUserName:string="";
  blogs: any[] = [];
  filterData: any[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user=this.authService.getLoggedInUser();
    this.loginName=this.user.name;
    this.loginUserName=this.user.username;
    this.blogs = this.blogService.getStoredData();
    this.filterBlogs();
  }
  filterBlogs() {
    this.filterData = this.blogs
      .map((blog, index) => ({ ...blog, id: index }))
      .filter((blog: {author: string;userName:string }) => {
        const Author = blog.author;
        const UserName = blog.userName;
        return (
          Author.includes(this.loginName) && UserName.includes(this.loginUserName)
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
  userlogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  }



