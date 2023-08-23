import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchedTag!: string;
  filterData: any[] = [];
  blogs:any[]=[];
  searchTerm!: string;
  

  constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchedTag = params['tag'];
      this.blogs=this.blogService.getStoredData();
         this.filterBlogs();
       });
      }

      filterBlogs() {
        this.filterData = this.blogs
          .map((blog, index) => ({ ...blog, id: index }))
          .filter((blog: { tags: string | string[] }) =>
            Array.isArray(blog.tags) && blog.tags.includes(this.searchedTag)
          );
          
      }   
}