// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BlogService } from '../blog.service';

// @Component({
//   selector: 'app-search-list',
//   templateUrl: './search-list.component.html',
//   styleUrls: ['./search-list.component.scss']
// })
// export class SearchListComponent implements OnInit {
//   searchedTag!: string;
//   blogData!: any[];
//   filterData: any[] = []; // Initialize the filterData array

//   constructor(private route: ActivatedRoute, private blogService: BlogService) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.searchedTag = params['tag'];
//       this.blogData = this.blogService.getBlogs();
//       this.filterBlogs();
//     });
//   }

//   filterBlogs() {
//     this.filterData = this.blogData.filter((blog: { tags: string | string[]; }) => blog.tags.includes(this.searchedTag));
//     console.log(this.filterData);
//   }
// }


//  get filteredBlogs() {
//   return this.blogData.filter((blog: { tags: string | string[]; }) => blog.tags.includes(this.searchedTag));
 //}

//}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchedTag!: string;
  blogData: any;
  filteredTitles: string[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchedTag = params['tag']; 
    });
  //   this.blogService.getBlogs().subscribe(data => {
  
  // //    if (data.tags.includes(this.searchedTag)) {
  // //     this.filteredTitles.push(data.title);
  // //   }
  // //  });
  //  console.log(this.filteredTitles);
    
  }

  // filterBlogs() {
  //   for (const blog of this.blogData) {
  //     if (blog.tags.includes(this.searchedTag)) {
  //       this.filteredTitles.push(blog.title);
  //     }
  //   }
    
  }

