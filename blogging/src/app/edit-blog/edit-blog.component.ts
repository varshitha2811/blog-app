import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  id!: string;
  blogData: any = {
    title: '',
    author: '',
    description: '',
    tags: '',
    url: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.blogService.getBlogById(this.id).subscribe(data => {
        this.blogData = data;
      });
    });
  }

  updateBlog(): void {
    this.blogService.updateBlog(this.id, this.blogData).subscribe(
      (updatedBlog) => {
        console.log(updatedBlog);
        this.router.navigate(['/blog/profile']);
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          console.error('Validation error:', error.error);
        } else {
          console.error('Error updating blog post:', error);
        }
      }
    );
  }
}
