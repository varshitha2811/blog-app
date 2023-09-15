
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showHeader = true;
  showFooter = true;
  searchTerm: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/')[1];
        if (currentRoute === 'profile') {
          this.showFooter = false;
        } else if (currentRoute === 'sign-up' || currentRoute === 'login') {
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }
  ngOnInit(): void {
  }
  performSearch() {
    this.router.navigate(['/search-list', this.searchTerm]);
  }
}
