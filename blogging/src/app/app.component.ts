import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  searchTerm: string = '';
  constructor(private blogService: BlogService,private router: Router) {}

  ngOnInit(): void {

  }
  performSearch() {
    this.router.navigate(['/search-list',this.searchTerm])

    
  }
}