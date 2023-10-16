import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });

    service = TestBed.inject(AdminService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize admin', () => {
    service.initializeAdmin().subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/blogs/initialize-admin');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should get all users', () => {
    const mockResponse = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];

    service.getAllUsers().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/blogs/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update can write blog', () => {
    const userId = 1;
    const canWriteBlog = true;
  
    service.updateCanWriteBlog(userId, canWriteBlog).subscribe(response => {
      expect(response).toBeDefined();
    });
  
    const req = httpTestingController.expectOne(req => req.url === 'http://localhost:8080/blogs/update-can-write-blog' && req.params.get('userId') === userId.toString() && req.params.get('canWriteBlog') === canWriteBlog.toString());
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });
  
  

  it('should disable profile', () => {
    const userId = '1';

    service.disableProfile(userId).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/blogs/disable-profile/${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should enable profile', () => {
    const userId = '1';

    service.enableProfile(userId).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/blogs/enable-profile/${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });
});
