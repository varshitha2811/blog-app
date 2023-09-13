// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BlogService } from '../blog.service';

// @Component({
//   selector: 'app-edit-blog',
//   templateUrl: './edit-blog.component.html',
//   styleUrls: ['./edit-blog.component.scss']
// })
// export class EditBlogComponent implements OnInit {
//   blogIndex!: number;
//   blogData: any;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private blogService: BlogService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.blogIndex = +params['index'];
//     });
//     this.blogService.getAllPosts().subscribe(data => {
//       this.blogData = data[this.blogIndex];
//     });
//   }

//   updateBlog(): void {
//     this.blogService.updateBlog(this.blogIndex, this.blogData);
//     this.router.navigate(['/profile']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  blogIndex!: number;
  blogData: any;
  descriptionValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.blogIndex = +params['index'];
    });
    this.blogService.getAllPosts().subscribe(data => {
      this.blogData = data[this.blogIndex];
      this.checkDescriptionLength();
    });
  }

  updateBlog(): void {
    if (this.descriptionValid) {
      this.blogService.updateBlog(this.blogIndex, this.blogData);
      this.router.navigate(['/profile']);
    }
  }

  checkDescriptionLength(): void {
    this.descriptionValid = this.blogData.description && this.blogData.description.length >= 25;
  }
}
