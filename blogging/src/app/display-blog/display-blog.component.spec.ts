// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DisplayBlogComponent } from './display-blog.component';

// describe('DisplayBlogComponent', () => {
//   let component: DisplayBlogComponent;
//   let fixture: ComponentFixture<DisplayBlogComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [DisplayBlogComponent]
//     });
//     fixture = TestBed.createComponent(DisplayBlogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DisplayBlogComponent } from './display-blog.component';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';

describe('DisplayBlogComponent', () => {
  let component: DisplayBlogComponent;
  let fixture: ComponentFixture<DisplayBlogComponent>;
  let route: any;
  let router: any;
  let blogService: any;
  let authService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBlogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '1' }) } },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: AuthService, useValue: { getCurrentUser: jest.fn(() => of({ name: 'Test User', username: 'testuser' })) } },
        { provide: BlogService, useValue: { getBlogById: jest.fn(() => of({ id: '1', title: 'Test Blog', comments: [] })), addComment: jest.fn(() => of({})), deleteComment: jest.fn(() => of({})) } },
      ],
    });

    fixture = TestBed.createComponent(DisplayBlogComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    blogService = TestBed.inject(BlogService);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on ngOnInit', () => {
    blogService.getBlogById.mockReturnValueOnce(of({ id: '1', title: 'Test Blog', comments: [] }));
    authService.getCurrentUser.mockReturnValueOnce(of({ name: 'Test User', username: 'testuser' }));

    component.ngOnInit();

    expect(blogService.getBlogById).toHaveBeenCalledWith('1');
    expect(component.postId).toEqual('1');
    expect(component.user).toEqual({ name: 'Test User', username: 'testuser' });
  });

  it('should add a comment on submitComment', () => {
    blogService.addComment.mockReturnValueOnce(of({}));
    component.newComment = 'Test Comment';
    component.postId = '1';
    component.userName = 'Test User';  
    component.submitComment();
  
    expect(blogService.addComment).toHaveBeenCalledWith('1', { name: 'Test User', comment: 'Test Comment' });
    expect(component.newComment).toEqual('');
  });
    

  it('should delete a comment on deleteComment', () => {
    blogService.deleteComment.mockReturnValueOnce(of({}));
    component.postId = '1';
    component.blogData = { id: '1', title: 'Test Blog', comments: [{ id: 'comment1', name: 'Test User', comment: 'Test Comment' }] };

    component.deleteComment(0);

    expect(blogService.deleteComment).toHaveBeenCalledWith('1', 0);
    expect(component.blogData.comments.length).toEqual(0);
  });

});
