import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.scss']
})
export class DisplayBlogComponent {
  blogIndex!: number;
  blogData: any;
  blogs: any[] = [];
  constructor(private route: ActivatedRoute, private blogService: BlogService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogIndex = +params['id'];
      console.log(this.blogIndex);
    });
    this.blogs = this.blogService.getStoredData();
    this.blogData = this.blogs[this.blogIndex];
  }
}