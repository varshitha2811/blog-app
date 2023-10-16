import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { SessionService } from '../session-service.service';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock: any; // Mock for AuthService
  let blogServiceMock: any; // Mock for BlogService
  let routerMock: any; // Mock for Router
  let sessionServiceMock: any; // Mock for SessionService

  beforeEach(async () => {
    authServiceMock = {
      getCurrentUser: jest.fn(() => of({ name: 'John Doe', username: 'john_doe', profileEnabled: true })),
    };

    blogServiceMock = {
      getUserProfile: jest.fn(() => of({ blogs: [{ _id: '1', title: 'Blog 1' }, { _id: '2', title: 'Blog 2' }] })),
      deleteBlog: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    sessionServiceMock = {
      endSession: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: AuthService, useValue: authServiceMock },
        { provide: BlogService, useValue: blogServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: SessionService, useValue: sessionServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile data', () => {
    expect(component.loginName).toBe('John Doe');
    expect(component.loginUserName).toBe('john_doe');
    expect(component.profileEnabled).toBe(true);
    expect(component.blogs).toEqual([{ _id: '1', title: 'Blog 1' }, { _id: '2', title: 'Blog 2' }]);
  });

  it('should navigate to edit profile page on editProfile() call', () => {
    component.editProfile();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/blog/profile/edit']);
  });
  

  it('should logout user', () => {
    component.userlogout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwt_token');
    expect(sessionServiceMock.endSession).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
  
});
