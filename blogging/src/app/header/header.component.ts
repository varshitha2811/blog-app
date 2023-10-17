import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
  isAdmin: boolean = false;
  constructor(
    private route: Router,private authService:AuthService
  ) { }
  ngOnInit(): void {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })};
  handleSearch() {
    if (this.searchText.trim() !== '') {
      this.route.navigate(['search-list', this.searchText]);
    }
    this.isMenu = true;
    this.searchText = '';
    // this.isMenu = !this.isMenu;
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