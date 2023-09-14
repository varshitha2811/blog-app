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
  loginName: string = "";
  loginUserName: string = "";
  blogs: any[] = [];
  filterData: any[] = [];

  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    this.loginName = this.user.name;
    this.loginUserName = this.user.username;
    this.blogService.getAllPosts().subscribe((data: any[]) => {
      this.blogs = data;
      this.filterData = this.filterBlogs(this.blogs, this.loginName, this.loginUserName);
    });
  }

  filterBlogs(blogs: any[], loginName: string, loginUserName: string): any[] {
    return blogs.filter((blog: { author: string; userName: string }) => {
      const Author = blog.author;
      const UserName = blog.userName;
      return (
        Author.includes(loginName) && UserName.includes(loginUserName)
      );
    });
  }


  deleteBlog(blogId: string): void {
    console.log(blogId); 0
    this.blogService.deleteBlog(blogId).subscribe(
      () => {
      },
      (error: any) => {
      }
    );
  }

  userlogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
