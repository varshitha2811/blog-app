import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserProfile, UserProfileService } from './user-profile.service';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService]
    });
    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user profile', () => {
    const userprofile: UserProfile = {
      FirstName: 'John',
      LastName: 'Doe',
      userName: 'johndoe',
      email: 'johndoe@example.com'
    };

    service.createUserProfile(userprofile).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush({}); 
  });

  it('should update a user profile', () => {
    const username = 'johndoe';
    const userprofile: UserProfile = {
      FirstName: 'John',
      LastName: 'Doe',
      userName: 'johndoe',
      email: 'johndoe@example.com'
    };

    service.updateUserProfile(username, userprofile).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${username}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}); 
  });

  it('should get a user profile by username', () => {
    const username = 'johndoe';

    service.getUserProfileByUsername(username).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush({}); 
  });
});
