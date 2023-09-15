// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BlogService } from '../blog.service';

// @Component({
//   selector: 'app-search-list',
//   templateUrl: './search-list.component.html',
//   styleUrls: ['./search-list.component.scss']
// })
// export class SearchListComponent implements OnInit {
//   searchedTag!: string;
//   filterData: any[] = [];
//   blogs: any[] = [];
//   searchTerm!: string;

//   constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService) { }

//   ngOnInit(): void {

//     this.route.params.subscribe(params => {
//       this.searchedTag = params['tag'];
//       this.blogService.fetchByTags(this.searchedTag).subscribe((data: any[]) => {
//         console.log(this.searchedTag);

//         if (this.blogs.length === 0) this.blogs = data;
//         else
//           this.blogs.push(data);
//       });
//       if (this.blogs.length === 0) {
//         this.blogService.fetchByauthor(this.searchedTag).subscribe((data: any[]) => {
//           console.log(this.searchedTag);
//           this.blogs = data;
//         });
//       }
//     });
//     this.refreshPage();
//   }
//   refreshPage(): void {
//     this.router.navigate(['search-list', this.searchedTag]);
//   }
//   filterBlogs() {
//     this.filterData = this.blogs
//       .map((blog, index) => ({ ...blog, i: index }))
//       .filter((blog: { tags: string[]; author: string; title: string }) => {
//         const lowercaseSearchTerm = this.searchedTag.toLowerCase();
//         const lowercaseTags = blog.tags.map(tag => tag.toLowerCase());
//         const lowercaseAuthor = blog.author.toLowerCase();
//         const lowercaseTitle = blog.title.toLowerCase();

//         return (
//           lowercaseTags.includes(lowercaseSearchTerm) ||
//           lowercaseAuthor.includes(lowercaseSearchTerm) ||
//           lowercaseTitle.includes(lowercaseSearchTerm)
//         );
//       });
//   }
// }

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
  
