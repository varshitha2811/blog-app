// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { BlogService } from '../blog.service';
// import { SessionService } from '../session-service.service';
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {
//   user: any;
//   // profilePictureUrl: '',
//   loginName: string = "";
//   loginUserName: string = "";
//   blogs: any[] = [];
//   filterData: any[] = [];
//   constructor(private route: ActivatedRoute,
//     private blogService: BlogService,
//     private authService: AuthService,
//     private router: Router,
//     private sessionService: SessionService) { }


//   ngOnInit(): void {
//     this.authService.getCurrentUser().subscribe((data: any[]) => {
//       this.user = data;
//       this.loginName = this.user.name;
//       this.loginUserName = this.user.username;
//       // this.user.profilePictureUrl = data.profilePictureUrl || '';
//     });

//     this.blogService.getAllPosts().subscribe((data: any[]) => {
//       this.blogs = data;
//       this.filterData = this.filterBlogs(this.blogs, this.loginName, this.loginUserName);
//     });
//   }
//   filterBlogs(blogs: any[], loginName: string, loginUserName: string): any[] {
//     return blogs.filter((blog: { author: string; userName: string }) => {
//       const Author = blog.author;
//       const UserName = blog.userName;
//       return (
//         Author && UserName && Author.includes(loginName) && UserName.includes(loginUserName)
//       );
//     });
//   }
  
//   // filterBlogs(blogs: any[], loginName: string, loginUserName: string): any[] {
//   //   return blogs.filter((blog: { author: string; userName: string }) => {
//   //     const Author = blog.author;
//   //     const UserName = blog.userName;
//   //     return (
//   //       Author.includes(loginName) && UserName.includes(loginUserName)
//   //     );
//   //   });
//   // }


//   deleteBlog(blogId: string): void {
//     this.blogService.deleteBlog(blogId).subscribe(
//       () => {
//         this.blogs = this.blogs.filter(blog => blog._id !== blogId);
//         console.log(blogId);
//         location.reload();
//       },
//       (error: any) => {
//         console.error('Error deleting blog post:', error);
//       }
//     );

//   }
//   userlogout() {
//     localStorage.removeItem("jwt_token");
//     this.sessionService.endSession();
//     this.router.navigate(['/login']);
//   }
  
// // }
// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { BlogService } from '../blog.service';
// import { SessionService } from '../session-service.service';
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {
//   user: any;
//   loginName: string = "";
//   loginUserName: string = "";
//   blogs: any[] = [];
//   filterData: any[] = [];
//   showMessage: boolean = false;
//   constructor(private route: ActivatedRoute,
//     private blogService: BlogService,
//     private authService: AuthService,
//     private router: Router,
//     private sessionService: SessionService) { }
//   ngOnInit(): void {
//     this.authService.getCurrentUser().subscribe((data: any[]) => {
//       this.user = data;
//       this.loginName = this.user.name;
//       this.loginUserName = this.user.username;
//       this.blogService.getUserProfile(this.loginUserName).subscribe(
//         (data) => {
//           this.blogs = data.blogs;
//           setTimeout(() => {
//             this.showMessage = true;
//           }, 2000);
//         },
//         (error) => {
//           console.error('Error fetching user profile', error)
//         }
//       );
//     });
//   }
//   editProfile() {
//     this.router.navigate(['/blog/profile/edit']);
//   }
//   deleteBlog(blogId: string): void {
//     this.blogService.deleteBlog(blogId).subscribe(
//       () => {
//         this.blogs = this.blogs.filter(blog => blog._id !== blogId);
//         console.log(blogId);
//         location.reload();
//       },
//       (error: any) => {
//         console.error('Error deleting blog post:', error);
//       }
//     );
//   }
//   userlogout() {
//     localStorage.removeItem("jwt_token");
//     this.sessionService.endSession();
//     this.router.navigate(['/login']);
//   }
// }
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { SessionService } from '../session-service.service';
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
  showMessage: boolean = false;
  profileEnabled:boolean=true;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService) { }
  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe((data: any[]) => {
      this.user = data;
      this.loginName = this.user.name;
      this.loginUserName = this.user.username;
      this.profileEnabled=this.user.profileEnabled;
      
      this.blogService.getUserProfile(this.loginUserName).subscribe(
        (data) => {
          this.blogs = data.blogs;
          setTimeout(() => {
            this.showMessage = true;
          }, 2000);
        },
        (error) => {
          console.error('Error fetching user profile', error)
        }
      );
    });
  }
  editProfile() {
    this.router.navigate(['/blog/profile/edit']);
  }
  deleteBlog(blogId: string): void {
    this.blogService.deleteBlog(blogId).subscribe(
      () => {
        this.blogs = this.blogs.filter(blog => blog._id !== blogId);
        console.log(blogId);
        location.reload();
      },
      (error: any) => {
        console.error('Error deleting blog post:', error);
      }
    );
  }
  userlogout() {
    localStorage.removeItem("jwt_token");
    this.sessionService.endSession();
    this.router.navigate(['/login']);
  }
}