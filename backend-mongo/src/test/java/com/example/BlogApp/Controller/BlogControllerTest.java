package com.example.BlogApp.Controller;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.Entity.Comment;
import com.example.BlogApp.repo.BlogPostRepository;
import com.example.BlogApp.repo.UserProfileRepository;
import com.example.BlogApp.repo.UserReposiotory;
@ExtendWith(MockitoExtension.class)
class BlogControllerTest {
    @Mock
    private BlogPostRepository blogPostRepository;
    @Mock
    private UserReposiotory userRepository;
    @Mock
    private UserProfileRepository userProfileRepository;
    @InjectMocks
    private BlogController blogController;

@Test
    void testGetAllBlogPosts() {
        List<Blog> mockBlogs = new ArrayList<>();
        mockBlogs.add(new Blog("1", "Blogging Basics", "Aanchal", List.of("Description for Blogging"),
                List.of("blogs", "basics"), "url1", "11:00PM", new ArrayList<>(), null));
        when(blogPostRepository.findAll()).thenReturn(mockBlogs);
        List<Blog> result = blogController.getAllBlogPost();
        assertEquals(mockBlogs, result, "Returned list not matching existing.");
    }
    @Test
    void testGetAllBlogPostsWithEmptyResult() {
        List<Blog> mockBlogs = new ArrayList<>();
        when(blogPostRepository.findAll()).thenReturn(mockBlogs);
        List<Blog> result = blogController.getAllBlogPost();
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetBlogByIdWithValidId() {
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog mockBlog = new Blog("1", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM", new ArrayList<>(), null);
        when(blogPostRepository.findById("1")).thenReturn(Optional.of(mockBlog));
        ResponseEntity<Blog> responseEntity = blogController.getBlogById("1");
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Blog resultBlog = responseEntity.getBody();
        assertNotNull(resultBlog);
        assertEquals(mockBlog, resultBlog);
    }
    @Test
    void testUpdateBlog_ValidId() {
        String blogId = "1";
        Blog updatedBlog = new Blog();
        updatedBlog.setTitle("Updated Title");
        updatedBlog.setAuthor("Updated Author");
        updatedBlog.setDescription(Arrays.asList("Description1"));
        updatedBlog.setTags(Arrays.asList("Tag1", "Tag2"));
        updatedBlog.setUrl("https://www.example.com/updated");
        updatedBlog.setTime("11:00 PM");

        Blog existingBlog = new Blog();
        existingBlog.setId(blogId);
        existingBlog.setTitle("Original Title");
        existingBlog.setAuthor("Original Author");
        updatedBlog.setDescription(Arrays.asList("Description1"));
        existingBlog.setTags(Arrays.asList("Java", "Spring", "Programming"));
        existingBlog.setUrl("https://www.example.com/original");
        existingBlog.setTime("12:00 PM");

        when(blogPostRepository.findById(blogId)).thenReturn(Optional.of(existingBlog));
        when(blogPostRepository.save(any(Blog.class))).thenReturn(updatedBlog);
        ResponseEntity<Blog> responseEntity = blogController.updateBlog(blogId, updatedBlog);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(updatedBlog, responseEntity.getBody());
    }
    @Test
    void testUpdateBlog_InvalidId() {
    String blogId = "999";

    Blog updatedBlog = new Blog();
    updatedBlog.setTitle("Updated Title");
    updatedBlog.setAuthor("Updated Author");
    updatedBlog.setDescription(Arrays.asList("Description1"));
    updatedBlog.setTags(Arrays.asList("Tag1", "Tag2"));
    updatedBlog.setUrl("https://www.example.com/updated");
    updatedBlog.setTime("11:00 PM");
    when(blogPostRepository.findById(blogId)).thenReturn(Optional.empty());
    ResponseEntity<Blog> responseEntity = blogController.updateBlog(blogId, updatedBlog);
    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    assertNull(responseEntity.getBody());
}

    @Test
    void testDeleteBlog_Success() {
        String blogId = "123";
        ResponseEntity<?> responseEntity = blogController.deleteBlog(blogId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(blogPostRepository, times(1)).deleteById(blogId);
    }
    @Test
    void testDeleteBlog_Exception() {
        String blogId = "123";
        doThrow(new RuntimeException("Some error")).when(blogPostRepository).deleteById(blogId);
        ResponseEntity<?> responseEntity = blogController.deleteBlog(blogId);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Error deleting blog post.", responseEntity.getBody());
    }

    @Test
    void testDeleteBlog_NotFound() {
        String blogId = "123";
        doThrow(new EmptyResultDataAccessException(1)).when(blogPostRepository).deleteById(blogId);
        ResponseEntity<?> responseEntity = blogController.deleteBlog(blogId);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteBlog_OtherException() {
        String blogId = "123";
        doThrow(new IllegalArgumentException("Some other error")).when(blogPostRepository).deleteById(blogId);
        ResponseEntity<?> responseEntity = blogController.deleteBlog(blogId);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Error deleting blog post.", responseEntity.getBody());
    }

    @Test
    void testDeleteBlog_NullId() {
        ResponseEntity<?> responseEntity = blogController.deleteBlog(null);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("ID cannot be null", responseEntity.getBody());
    }
    
    @Test
    void testAddComment() {
        String blogId = "123";
        Comment comment = new Comment("Aanchal", "Comments");
        Optional<Blog> mockOptionalBlog = Optional.of(new Blog());
        when(blogPostRepository.findById(blogId)).thenReturn(mockOptionalBlog);
        ResponseEntity<?> responseEntity = blogController.addComment(blogId, comment);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    @Test
    void testAddCommentNoBlogFound() {
        String blogId = "123";
        when(blogPostRepository.findById(blogId)).thenReturn(Optional.empty());
        Comment comment = new Comment();
        comment.setComment("Test Comment");
        ResponseEntity<?> responseEntity = blogController.addComment(blogId, comment);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(blogPostRepository, never()).save(any());
    }
    @Test
    void testAddCommentError() {
        String blogId = "123";
        Comment comment = new Comment();
        comment.setComment("Test Comment");
        when(blogPostRepository.findById(blogId)).thenThrow(new RuntimeException("Simulated error"));
        ResponseEntity<?> responseEntity = blogController.addComment(blogId, comment);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Error adding comment.", responseEntity.getBody());
        verify(blogPostRepository, never()).save(any(Blog.class));
    }
    @Test
    void testAddCommentWithValidBlogIdAndComment() {
        String blogId = "123";
        Comment comment = new Comment("Aanchal", "Comments");
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog mockBlog = new Blog("123", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM",
                new ArrayList<>(), null);
        Optional<Blog> mockOptionalBlog = Optional.of(mockBlog);
        when(blogPostRepository.findById(blogId)).thenReturn(mockOptionalBlog);
        ResponseEntity<?> responseEntity = blogController.addComment(blogId, comment);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    @Test
    void testAddCommentWithNullComment() {
        String blogId = "123";
        Comment comment = null;
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog mockBlog = new Blog("1", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM",
                new ArrayList<>(), null);
        Optional<Blog> mockOptionalBlog = Optional.of(mockBlog);
        lenient().when(blogPostRepository.findById(blogId)).thenReturn(mockOptionalBlog);
        ResponseEntity<?> responseEntity = blogController.addComment(blogId, comment);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Comment cannot be null.", responseEntity.getBody());
    }
    @Test
    void testAddCommentWithInvalidBlogIdAndNullComment() {
        String blogId = "invalidId";
        Comment comment = null;
        ResponseEntity<?> responseEntity = blogController.addComment(blogId, comment);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
    @Test
    public void testDeleteCommentAtIndex0() {
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog blog = new Blog("1", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM", new ArrayList<>(), null);
        blog.setId("12345");
        List<Comment> comments = new ArrayList<>();
        comments.add(new Comment("john", "john comment"));
        blog.setComments(comments);
        Mockito.when(blogPostRepository.findById("12345")).thenReturn(Optional.of(blog));
        ResponseEntity<?> response = blogController.deleteComment("12345", 0);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @Test
    public void testDeleteCommentAtValidIndex() {
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog blog = new Blog("12345", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM",new ArrayList<>(), null);
        blog.setId("12345");
        List<Comment> comments = new ArrayList<>();
        comments.add(new Comment("john", "john comment"));
        comments.add(new Comment("jane", "jane comment"));
        blog.setComments(comments);
        Mockito.when(blogPostRepository.findById("12345")).thenReturn(Optional.of(blog));
        ResponseEntity<?> response = blogController.deleteComment("12345", 1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @Test
    public void testDeleteCommentAtInvalidIndex() {
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog blog = new Blog("12345", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM",
                new ArrayList<>(), null);
        blog.setId("12345");
        List<Comment> comments = new ArrayList<>();
        comments.add(new Comment("john", "john comment"));
        blog.setComments(comments);
        Mockito.when(blogPostRepository.findById("12345")).thenReturn(Optional.of(blog));
        ResponseEntity<?> response = blogController.deleteComment("12345", 1);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
    @Test
    public void testDeleteCommentFromBlogWithNoComments() {
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog blog = new Blog("12345", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM",
                new ArrayList<>(), null);
        blog.setId("12345");
        Mockito.when(blogPostRepository.findById("12345")).thenReturn(Optional.of(blog));
        ResponseEntity<?> response = blogController.deleteComment("12345", 0);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
    @Test
    void testSearchBlogsWithNullSearchTerm() {
    String searchTerm = null;
    List<Blog> result = blogController.searchBlogs(searchTerm);
    assertTrue(result.isEmpty());
}
    @Test
    void testSearchBlogswithMatches(){
        String searchTerm="basics";
        List<String> description = List.of("Description for Blogging");
        List<String> tags = List.of("blogs", "basics");
        Blog blog = new Blog("12345", "Blogging Basics", "Aanchal", description, tags, "url1", "11:00PM",new ArrayList<>(), null);
        List<Blog> mockBlogs = List.of(blog);
        when(blogPostRepository.findAll()).thenReturn(mockBlogs);
        List<Blog> result = blogController.searchBlogs(searchTerm);
        assertEquals(mockBlogs, result);
}
@Test
void testSearchBlogsWithNoMatches() {
    String searchTerm = "Title 3";
    List<Blog> mockBlogs = List.of(
        new Blog("1", "Title 1", "Author 1", List.of("Description 1"), List.of("tag1", "tag2"), "url1", "11:00PM", new ArrayList<>(), null),
        new Blog("2", "Title 2", "Author 2", List.of("Description 2"), List.of("tag1", "tag3"), "url2", "12:00PM", new ArrayList<>(), null)
    );
    BlogPostRepository blogPostRepository = mock(BlogPostRepository.class);
    when(blogPostRepository.findAll()).thenReturn(mockBlogs);
    BlogController blogController = new BlogController(blogPostRepository);
    List<Blog> result = blogController.searchBlogs(searchTerm);
    assertTrue(result.isEmpty());
}
@Test
    void testDeleteCommentInvalidIndex() {
        String blogId = "123";
        int commentIndex = 1;
        Blog blog = new Blog();
        blog.setId(blogId);
        Comment comment = new Comment();
        comment.setComment("Test Comment");
        List<Comment> comments = new ArrayList<>();
        comments.add(comment);
        blog.setComments(comments);
        when(blogPostRepository.findById(blogId)).thenReturn(Optional.of(blog));
        ResponseEntity<?> responseEntity = blogController.deleteComment(blogId, commentIndex);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        verify(blogPostRepository, never()).save(blog);
    }

    @Test
    void testDeleteCommentNoBlogFound() {
        String blogId = "123";
        int commentIndex = 0;
        when(blogPostRepository.findById(blogId)).thenReturn(Optional.empty());
        ResponseEntity<?> responseEntity = blogController.deleteComment(blogId, commentIndex);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(blogPostRepository, never()).save(any());
    }
    @Test
    void testDeleteCommentError() {
    String blogId = "123";
    int commentIndex = 0;
    Blog blog = new Blog();
    blog.setId(blogId);
    Comment comment = new Comment();
    comment.setComment("Test Comment");
    List<Comment> comments = new ArrayList<>();
    comments.add(comment);
    blog.setComments(comments);
    when(blogPostRepository.findById(blogId)).thenReturn(Optional.of(blog));
    doThrow(new RuntimeException("Simulated error")).when(blogPostRepository).save(blog);
    ResponseEntity<?> responseEntity = blogController.deleteComment(blogId, commentIndex);
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    assertEquals("Error deleting comment.", responseEntity.getBody());
    verify(blogPostRepository, times(1)).save(blog);
}

}