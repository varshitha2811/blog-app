import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.scss']
})
export class DisplayBlogComponent {
  blogIndex!: number ;
  blogData:any;;
  constructor(private route: ActivatedRoute,private blogService: BlogService) { }

  ngOnInit(): void {
         this.route.params.subscribe(params => {
           this.blogIndex = +params['id']; // Retrieve the index parameter
         });
         this.blogService.getBlogs().subscribe(data => {
          this.blogData = data[this.blogIndex];
        });
       }

}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-display-blog',
//   templateUrl: './display-blog.component.html',
//   styleUrls: ['./display-blog.component.css']
// })
// export class DisplayBlogComponent implements OnInit {
//   blogIndex: number | undefined;

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.blogIndex = +params['id']; // Retrieve the index parameter
//     });
//   }
// }
