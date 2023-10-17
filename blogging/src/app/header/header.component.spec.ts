// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService } from '../auth.service';
// import { HeaderComponent } from './header.component';

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [HeaderComponent],
//       imports: [RouterTestingModule], // Add necessary imports like RouterTestingModule
//       providers: [AuthService], 
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: any;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService], // Add AuthService to the providers
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    router.navigate = jest.fn(); // Use jest.fn() to mock the navigate function
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin to true when user is an admin', () => {
    jest.spyOn(authService, 'isAdmin').mockReturnValue(of(true));
    component.ngOnInit();
    expect(component.isAdmin).toBeTruthy();
  });

  it('should navigate to search-list with searchText when handleSearch is called', () => {
    component.searchText = 'testSearch';
    component.handleSearch();
    expect(router.navigate).toHaveBeenCalledWith(['search-list', 'testSearch']);
    expect(component.searchText).toEqual('');
    expect(component.isMenu).toBe(true);
  });

  it('should toggle isSearchBarVisible when showSearchBar is called', () => {
    component.showSearchBar();
    expect(component.isSearchBarVisible).toBe(true);
    component.showSearchBar();
    expect(component.isSearchBarVisible).toBe(false);
  });

  it('should toggle showProfile when showProfileDropDown is called', () => {
    component.showProfileDropDown();
    expect(component.showProfile).toBe(false);
    component.showProfileDropDown();
    expect(component.showProfile).toBe(true);
  });

  it('should toggle isMenu when showMenu is called', () => {
    component.showMenu();
    expect(component.isMenu).toBe(false);
    component.showMenu();
    expect(component.isMenu).toBe(true);
  });
});
