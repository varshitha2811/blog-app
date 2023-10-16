import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BlogService, Comment, blog } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all posts from API', () => {
    const dummyPosts: blog[] = [
      {
        id: 1,
        title: 'Sample Blog 1',
        author: 'John Doe',
        description: ['Description 1'],
        tags: ['tag1', 'tag2'],
        url: 'https://example.com/sample-blog-1',
        time: '2023-10-16T12:00:00Z',
        comments: [
          { name: 'Alice', comment: 'Great post!' },
          { name: 'Bob', comment: 'Nice article.' }    
        ],
        userName: 'johndoe'
      },
      {
        id: 2,
        title: 'Sample Blog 2',
        author: 'Jane Doe',
        description: ['Description 2'],
        tags: ['tag2', 'tag3'],
        url: 'https://example.com/sample-blog-2',
        time: '2023-10-17T13:00:00Z',
        comments: [
          { name: 'Charlie', comment: 'Well written!' }
        ],
        userName: 'janedoe'
      }
    ];


    service.getAllPosts().subscribe(posts => {
      expect(posts.length).toBe(dummyPosts.length);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/home`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should add a comment to a blog', () => {
    const blogId = '123';
    const comment: Comment = { name: 'John Doe', comment: 'Great post!' };

    service.addComment(blogId, comment).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/add-comment/${blogId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(comment);
    req.flush({ success: true }); 
  });
  it('should fetch blogs by tags from API', () => {
    const searchedTag = 'angular';
    const dummyBlogs: blog[] = [
      {
        id: 1,
        title: 'Sample Blog 1',
        author: 'John Doe',
        description: ['Description 1'],
        tags: ['tag1', 'tag2'],
        url: 'https://example.com/sample-blog-1',
        time: '2023-10-16T12:00:00Z',
        comments: [
          { name: 'Alice', comment: 'Great post!' },
          { name: 'Bob', comment: 'Nice article.' }    
        ],
        userName: 'johndoe'
      }
    ];
  
    service.fetchByTags(searchedTag).subscribe(blogs => {
      expect(blogs.length).toBe(dummyBlogs.length);
      expect(blogs).toEqual(dummyBlogs);
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/home/tag/${searchedTag}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlogs);
  });
  
  it('should fetch blogs by author from API', () => {
    const searchedAuthor = 'John Doe';
    const dummyBlogs: blog[] = [
      {
        id: 1,
        title: 'Sample Blog 1',
        author: 'John Doe',
        description: ['Description 1'],
        tags: ['tag1', 'tag2'],
        url: 'https://example.com/sample-blog-1',
        time: '2023-10-16T12:00:00Z',
        comments: [
          { name: 'Alice', comment: 'Great post!' },
          { name: 'Bob', comment: 'Nice article.' }    
        ],
        userName: 'johndoe'
      }
    ];
  
    service.fetchByauthor(searchedAuthor).subscribe(blogs => {
      expect(blogs.length).toBe(dummyBlogs.length);
      expect(blogs).toEqual(dummyBlogs);
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/home/author/${searchedAuthor}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlogs);
  });
  
  it('should retrieve a blog by ID from API', () => {
    const blogId = '123';
    const dummyBlog: blog = {
        id: 1,
        title: 'Sample Blog 1',
        author: 'John Doe',
        description: ['Description 1'],
        tags: ['tag1', 'tag2'],
        url: 'https://example.com/sample-blog-1',
        time: '2023-10-16T12:00:00Z',
        comments: [
          { name: 'Alice', comment: 'Great post!' },
          { name: 'Bob', comment: 'Nice article.' }    
        ],
        userName: 'johndoe'
    };
  
    service.getBlogById(blogId).subscribe(blog => {
      expect(blog).toEqual(dummyBlog);
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/${blogId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlog);
  });
  
  it('should filter blogs by author and userName from API', () => {
    const author = 'John Doe';
    const userName = 'johndoe';
    const dummyBlogs: blog[] = [
      {
        id: 1,
        title: 'Sample Blog 1',
        author: 'John Doe',
        description: ['Description 1'],
        tags: ['tag1', 'tag2'],
        url: 'https://example.com/sample-blog-1',
        time: '2023-10-16T12:00:00Z',
        comments: [
          { name: 'Alice', comment: 'Great post!' },
          { name: 'Bob', comment: 'Nice article.' }    
        ],
        userName: 'johndoe'
      }
    ];
  
    service.filterBlogsByAuthorAndUserName(author, userName).subscribe(blogs => {
      expect(blogs.length).toBe(dummyBlogs.length);
      expect(blogs).toEqual(dummyBlogs);
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/filter?author=${author}&userName=${userName}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlogs);
  });
  it('should fetch blogs by author from API', () => {
    const searchedAuthor = 'John Doe';
      const dummyBlogs: blog[] = [
        {
          id: 1,
          title: 'Sample Blog 1',
          author: 'John Doe',
          description: ['Description 1'],
          tags: ['tag1', 'tag2'],
          url: 'https://example.com/sample-blog-1',
          time: '2023-10-16T12:00:00Z',
          comments: [
            { name: 'Alice', comment: 'Great post!' },
            { name: 'Bob', comment: 'Nice article.' }
          ],
          userName: 'johndoe'
        }
      ];

    service.fetchByauthor(searchedAuthor).subscribe(blogs => {
      expect(blogs.length).toBe(dummyBlogs.length);
      expect(blogs).toEqual(dummyBlogs);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/home/author/${searchedAuthor}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlogs);
  });

  it('should retrieve a blog by ID from API', () => {
    const blogId = '123';
    const dummyBlog: blog[] = [
      {
        id: 1,
        title: 'Sample Blog 1',
        author: 'John Doe',
        description: ['Description 1'],
        tags: ['tag1', 'tag2'],
        url: 'https://example.com/sample-blog-1',
        time: '2023-10-16T12:00:00Z',
        comments: [
          { name: 'Alice', comment: 'Great post!' },
          { name: 'Bob', comment: 'Nice article.' }    
        ],
        userName: 'johndoe'
      }
    ];

    service.getBlogById(blogId).subscribe(blog => {
      expect(blog).toEqual(dummyBlog);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${blogId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlog);
  });
});

