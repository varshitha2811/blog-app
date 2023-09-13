import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenu: boolean = true;
  isSearchBarVisible: boolean = false;
  searchText: string = '';
  showProfile: boolean = true;

  constructor(
    private route: Router,
  ) { }

  handleSearch() {
    if (this.searchText.trim() !== '') {
      this.route.navigate(['/search-list', this.searchText]);
    }
    this.searchText = '';
    this.isMenu = !this.isMenu;
  }

  showSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  showProfileDropDown() {
    this.showProfile = !this.showProfile;
  }

  showMenu() {
    this.isMenu = !this.isMenu;
  }
}