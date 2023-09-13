import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  blogs: any[] = [];
  constructor(private blogService:BlogService,private http: HttpClient) {}
   ngOnInit() {
    this.blogService.getAllPosts().subscribe((data: any[]) => {
      this.blogs=data;
    });
  }
}
