import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { SessionService } from '../session-service.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  let router: Router;
  let sessionService: SessionService;

  beforeEach(() => {
    authService = { loginUser: () => of({ jwttoken: 'testToken' }) } as any; // Mock AuthService
    router = {} as any; // Mock Router
    sessionService = {} as any; // Mock SessionService

    component = new LoginComponent(authService, router, sessionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should handle login with valid credentials', () => {
    const response = { jwttoken: 'your-token' };
    spyOn(authService, 'loginUser').and.returnValue(of(response));
    spyOn(sessionService, 'startSession');

    component.userName = 'testUser';
    component.password = 'testPassword';

    component.login();

    expect(authService.loginUser).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(sessionService.startSession).toHaveBeenCalledWith(response);
    expect(router.navigate).toHaveBeenCalledWith(['/blogs/home']);
  });

  it('should handle login with invalid credentials', () => {
    spyOn(authService, 'loginUser').and.returnValue(of(null));

    component.userName = 'testUser';
    component.password = 'testPassword';

    component.login();

    expect(authService.loginUser).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(component.errorMessage).toEqual('Invalid credentials');
  });

  it('should handle login with missing credentials', () => {
    component.errorMessage = '';

    component.login();

    expect(component.errorMessage).toEqual('Username and password does not match.');
  });
  
  
  
});
