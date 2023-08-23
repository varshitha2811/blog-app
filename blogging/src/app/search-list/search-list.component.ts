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
  blogData: any[] = [];
  filteredBlogs: any[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchedTag = params['tag'];
      this.blogData = this.blogService.getStoredData();
      this.filterBlogs();
    });
  }

  filterBlogs(): void {
    this.filteredBlogs = this.blogData.filter(blog => blog.tags.includes(this.searchedTag));
  }

  navigateTo(index: number) {
    const clickedBlog = this.filteredBlogs[index];
    const originalIndex = this.blogService.getStoredData().indexOf(clickedBlog);
    this.router.navigate(['/display-blog', originalIndex]);
    console.log(originalIndex);
  }
}
