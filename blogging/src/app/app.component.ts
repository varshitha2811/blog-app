import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader = true;
  showFooter = true;
  searchTerm: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/')[1]; 
        const excludedRoutes = ['sign-up', 'login']; 
       console.log(excludedRoutes);
      
       this.showHeader = !excludedRoutes.includes(currentRoute);
       this.showFooter = !excludedRoutes.includes(currentRoute);
       console.log(this.showFooter,this.showHeader)
      }
    });
  }

  ngOnInit(): void {
  }

  performSearch() {
    this.router.navigate(['/search-list', this.searchTerm]);
  }
}
