import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { SessionService } from '../session-service.service';
import { UserProfileService } from '../user-profile.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceMock: any;
  let routerMock: any;
  let blogServiceMock: any;
  let sessionServiceMock: any;
  let userProfileServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      createUser: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    blogServiceMock = {};

    sessionServiceMock = {
      startSession: jest.fn(),
    };

    userProfileServiceMock = {
      createUserProfile: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: BlogService, useValue: blogServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: UserProfileService, useValue: userProfileServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign up user successfully', () => {
    const response = { /* response object here */ };
    authServiceMock.createUser.mockReturnValue(of(response));

    component.name = 'John Doe';
    component.userName = 'johndoe';
    component.password = 'password123';
    component.signUp();
    expect(authServiceMock.createUser).toHaveBeenCalledWith(
      'John Doe',
      'johndoe',
      'password123'
    );
    expect(sessionServiceMock.startSession).toHaveBeenCalledWith(response);
    expect(userProfileServiceMock.createUserProfile).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  })
});
