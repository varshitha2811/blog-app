import { Component, OnInit , HostListener } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  blogs: any[] = [];

  

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogs=this.blogService.getStoredData();
  } 
  
}
