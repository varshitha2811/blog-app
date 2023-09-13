import { Component, OnInit, HostListener } from '@angular/core';
import { BlogService, blog } from '../blog.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  blogs: blog[] = [];

  constructor(private blogService: BlogService, private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.blogService.getAllPosts().subscribe((data: any[]) => {
      this.blogs=data;
      console.log(this.blogs);
    });
  }
  navigate(id: string) {
    console.log(id)
    this.router.navigate(['/blogs', id])
  }
}
