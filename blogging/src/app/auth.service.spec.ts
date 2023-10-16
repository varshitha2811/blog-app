import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, User } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, Router],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should create a new user', () => {
    const name = 'John Doe';
    const userName = 'johndoe';
    const password = 'password';

    authService.createUser(name, userName, password).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/auth/create-user');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should log in a user', () => {
    const userName = 'johndoe';
    const password = 'password';

    authService.loginUser(userName, password).subscribe((user: User) => {
      expect(user).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ name: 'John Doe', userName: 'johndoe', roles: ['ROLE_USER'] });
  });

  it('should get the current user', () => {
    authService.getCurrentUser().subscribe((user) => {
      expect(user).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/current-user');
    expect(req.request.method).toBe('GET');
    req.flush({ name: 'John Doe', userName: 'johndoe', roles: ['ROLE_USER'] });
  });

  it('should check if a user is an admin', () => {
    authService.isAdmin().subscribe((isAdmin) => {
      expect(isAdmin).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/current-user');
    expect(req.request.method).toBe('GET');
    req.flush({ name: 'John Doe', userName: 'johndoe', roles: ['ROLE_ADMIN'] });
  });
  // ...

it('should handle login error', () => {
  const userName = 'johndoe';
  const password = 'incorrectpassword';

  authService.loginUser(userName, password).subscribe(
    () => {
      // This should not be called in case of an error
      expect(true).toBe(false);
    },
    (error) => {
      expect(error).toBe('Invalid username or password');
    }
  );

  const req = httpTestingController.expectOne('http://localhost:8080/auth/login');
  expect(req.request.method).toBe('POST');
  req.error(new ErrorEvent('Unauthorized'), { status: 401 });
});

it('should handle getCurrentUser error', () => {
  authService.getCurrentUser().subscribe(
    () => {
      // This should not be called in case of an error
      expect(true).toBe(false);
    },
    (error) => {
      expect(error).toBeTruthy(); // Adjust this expectation as per your actual error handling
    }
  );

  const req = httpTestingController.expectOne('http://localhost:8080/current-user');
  expect(req.request.method).toBe('GET');
  req.error(new ErrorEvent('Internal Server Error'), { status: 500 });
});

it('should check if a user is not an admin', () => {
  authService.isAdmin().subscribe((isAdmin) => {
    expect(isAdmin).toBeFalsy();
  });

  const req = httpTestingController.expectOne('http://localhost:8080/current-user');
  expect(req.request.method).toBe('GET');
  req.flush({ name: 'John Doe', userName: 'johndoe', roles: ['ROLE_USER'] });
});

it('should handle getCurrentUser error for admin check', () => {
  authService.isAdmin().subscribe(
    () => {
      // This should not be called in case of an error
      expect(true).toBe(false);
    },
    (error) => {
      expect(error).toBeTruthy(); // Adjust this expectation as per your actual error handling
    }
  );

  const req = httpTestingController.expectOne('http://localhost:8080/current-user');
  expect(req.request.method).toBe('GET');
  req.error(new ErrorEvent('Internal Server Error'), { status: 500 });
});

});
