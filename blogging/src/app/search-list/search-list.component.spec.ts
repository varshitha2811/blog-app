import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BlogService } from '../blog.service';
import { SearchListComponent } from './search-list.component';

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const blogServiceSpyObj = jasmine.createSpyObj('BlogService', ['searchBlogs']);

    await TestBed.configureTestingModule({
      declarations: [SearchListComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ tag: 'angular' }) }
        },
        { provide: BlogService, useValue: blogServiceSpyObj }
      ]
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    blogServiceSpy = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchedTag and call filterBlogs on init', () => {
    expect(component.searchedTag).toEqual('angular');
    expect(blogServiceSpy.searchBlogs).toHaveBeenCalledWith('angular');
  });

  it('should handle successful blog filtering', () => {
    const dummyBlogs = [{ id: 1, title: 'Sample Blog 1' }, { id: 2, title: 'Sample Blog 2' }];
    blogServiceSpy.searchBlogs.and.returnValue(of(dummyBlogs));

    component.filterBlogs();

    expect(component.blogs).toEqual(dummyBlogs);
    expect(component.filterData).toEqual(dummyBlogs.map((blog, index) => ({ ...blog, i: index })));
  });

  it('should handle error when searching blogs', () => {
    const errorMessage = 'Error searching blogs';
    blogServiceSpy.searchBlogs.and.throwError(errorMessage);
    spyOn(console, 'error'); 
    component.filterBlogs();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });
  it('should handle error when searching blogs', () => {
    const errorMessage = 'Error searching blogs';
    blogServiceSpy.searchBlogs.and.returnValue(throwError(errorMessage)); 
    spyOn(console, 'error');
    component.filterBlogs();
    expect(component.blogs.length).toBe(0); 
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

});
