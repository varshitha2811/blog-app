import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { SessionService } from '../session-service.service';
import { AdminUserManagementComponent } from './admin-user-management.component';

describe('AdminUserManagementComponent', () => {
  let component: AdminUserManagementComponent;
  let fixture: ComponentFixture<AdminUserManagementComponent>;

  const adminServiceMock = {
    getAllUsers: jest.fn(),
    disableProfile: jest.fn(),
    enableProfile: jest.fn()
  };

  const authServiceMock = {
    getCurrentUser: jest.fn(() => of({ name: 'John Doe' }))
  };

  const blogServiceMock = {};

  const sessionServiceMock = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserManagementComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AdminService, useValue: adminServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: BlogService, useValue: blogServiceMock },
        { provide: SessionService, useValue: sessionServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all users on init', () => {
    const mockUsers = [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }];
    adminServiceMock.getAllUsers.mockReturnValue(of(mockUsers));

    component.ngOnInit();

    expect(adminServiceMock.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should disable profile', () => {
    const userId = '1';
    adminServiceMock.disableProfile.mockReturnValue(of({ success: true }));

    component.disableProfile(userId);

    expect(adminServiceMock.disableProfile).toHaveBeenCalledWith(userId);
    expect(component.loadAllUsers).toHaveBeenCalled();
  });

  it('should enable profile', () => {
    const userId = '1';
    adminServiceMock.enableProfile.mockReturnValue(of({ success: true }));

    component.enableProfile(userId);

    expect(adminServiceMock.enableProfile).toHaveBeenCalledWith(userId);
    expect(component.loadAllUsers).toHaveBeenCalled();
  });
});
