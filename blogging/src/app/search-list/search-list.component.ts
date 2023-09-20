import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
 
  export class SearchListComponent implements OnInit {
    searchedTag!: string;
    filterData: any[] = [];
    blogs: any[] = [];
    searchTerm!: string;
  
    constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.searchedTag = params['tag'];
        this.filterBlogs();
      });
    }
  
    filterBlogs() {
      this.blogService.searchBlogs(this.searchedTag).subscribe(
        (data: any[]) => {
          this.blogs = data;
          this.filterData = this.blogs.map((blog, index) => ({ ...blog, i: index }));
        },
        (error) => {
          console.error('Error searching blogs:', error);
        }
      );
    }
  }
  
