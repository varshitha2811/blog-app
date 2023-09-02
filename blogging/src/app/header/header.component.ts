import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isNavbarSearchVisible: boolean = true;
  searchTerm: string = '';
  constructor(private router: Router) { }
  toggleNavbarSearch() {
      this.isNavbarSearchVisible = !this.isNavbarSearchVisible;
  }
  toggleNavbar() {
    this.isNavbarSearchVisible = !this.isNavbarSearchVisible;
  }
  handleSearch() {
    console.log('handleSearch() called');
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search-list', this.searchTerm]);
    }
    this.searchTerm = '';
  }
}

