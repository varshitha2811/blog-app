import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomePageComponent } from './home-page.component';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let blogService: jest.Mocked<BlogService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BlogService,
          useValue: { getAllPosts: jest.fn() } as any,
        },
        {
          provide: AuthService,
          useValue: { getCurrentUser: jest.fn() } as any,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService) as jest.Mocked<BlogService>;
    blogService.getAllPosts.mockReturnValue(of([]));
  });

  // it('should fetch blogs on initialization', () => {
  //   fixture.detectChanges();
  //   expect(component.blogs).toEqual([]);
  // });
  it('should fetch blogs from the service on initialization', () => {
    const mockBlogs = [
      { id: '1', title: 'Blog 1', author: 'Author 1', description: ['Description 1'], tags: ['Tag1'], comments: [], url: 'url1', time: 'time1', userName: '' },
      { id: '2', title: 'Blog 2', author: 'Author 2', description: ['Description 2'], tags: ['Tag2'], comments: [], url: 'url2', time: 'time2', userName: '' },
    ];
    blogService.getAllPosts.mockReturnValue(of(mockBlogs));
    fixture.detectChanges();
    expect(component.blogs).toEqual(mockBlogs);
    expect(blogService.getAllPosts).toHaveBeenCalled();
  });

});