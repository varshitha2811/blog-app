package com.example.BlogApp.UnitTesting;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.Entity.Comment;
import com.example.BlogApp.Entity.UserProfile;

class BlogTest {

    @Test
    void testGetId() {
        Blog blog = new Blog();
        blog.setId("1");
        assertEquals("1", blog.getId());
    }
    @Test
    void testSetUserName(){
        Blog blog = new Blog();
        String userName = "sampleUser";
        blog.setUserName(userName);
        assertEquals(userName, blog.getUserName());
    }

    @Test
    void testSetId() {
        Blog blog = new Blog();
        blog.setId("1");
        assertEquals("1", blog.getId());
    }

    @Test
    void testSetUserProfile() {
        Blog blog = new Blog();
        UserProfile userProfile = new UserProfile();
        blog.setUserProfile(userProfile);
        assertEquals(userProfile, blog.getUserProfile());
    
}

    @Test
    void testGetTitle() {
        Blog blog = new Blog();
        blog.setTitle("Sample Title");
        assertEquals("Sample Title", blog.getTitle());
    }

    @Test
    void testSetTitle() {
        Blog blog = new Blog();
        blog.setTitle("Sample Title");
        assertEquals("Sample Title", blog.getTitle());
    }

    @Test
    void testGetAuthor() {
        Blog blog = new Blog();
        blog.setAuthor("Sample Author");
        assertEquals("Sample Author", blog.getAuthor());
    }

    @Test
    void testSetAuthor() {
        Blog blog = new Blog();
        blog.setAuthor("Sample Author");
        assertEquals("Sample Author", blog.getAuthor());
    }

    @Test
    void testGetDescription() {
        List<String> description = new ArrayList<>();
        description.add("Sample Description");
        Blog blog = new Blog();
        blog.setDescription(description);
        assertEquals(description, blog.getDescription());
    }

    @Test
    void testSetDescription() {
        List<String> description = new ArrayList<>();
        description.add("Sample Description");
        Blog blog = new Blog();
        blog.setDescription(description);
        assertEquals(description, blog.getDescription());
    }

    @Test
    void testGetTags() {
        List<String> tags = new ArrayList<>();
        tags.add("Tag1");
        tags.add("Tag2");
        Blog blog = new Blog();
        blog.setTags(tags);
        assertEquals(tags, blog.getTags());
    }

    @Test
    void testSetTags() {
        List<String> tags = new ArrayList<>();
        tags.add("Tag1");
        tags.add("Tag2");
        Blog blog = new Blog();
        blog.setTags(tags);
        assertEquals(tags, blog.getTags());
    }

    @Test
    void testGetUrl() {
        Blog blog = new Blog();
        blog.setUrl("http://sampleurl.com");
        assertEquals("http://sampleurl.com", blog.getUrl());
    }

    @Test
    void testSetUrl() {
        Blog blog = new Blog();
        blog.setUrl("http://sampleurl.com");
        assertEquals("http://sampleurl.com", blog.getUrl());
    }

    @Test
    void testGetTime() {
        Blog blog = new Blog();
        blog.setTime("12:00 PM");
        assertEquals("12:00 PM", blog.getTime());
    }

    @Test
    void testSetTime() {
        Blog blog = new Blog();
        blog.setTime("12:00 PM");
        assertEquals("12:00 PM", blog.getTime());
    }
    @Test
    void testConstructor1() {
    // Arrange
    String id = "1";
    String title = "Sample Title";
    String author = "Sample Author";
    List<String> description = List.of("Description 1", "Description 2");
    List<String> tags = List.of("Tag1", "Tag2");
    String url = "http://sampleurl.com";
    String time = "12:00 PM";
    Blog blog = new Blog(id, title, author, description, tags, url, time);
    assertEquals(id, blog.getId());
    assertEquals(title, blog.getTitle());
    assertEquals(author, blog.getAuthor());
    assertEquals(description, blog.getDescription());
    assertEquals(tags, blog.getTags());
    assertEquals(url, blog.getUrl());
    assertEquals(time, blog.getTime());
    assertNull(blog.getComments());
    assertNull(blog.getUserName());
    assertNull(blog.getUserProfile());
}
@Test
void testConstructor2() {
    String id = "1";
    List<Comment> comments = List.of(
        new Comment("User1", "Comment1"),
        new Comment("User2", "Comment2")
    );
    String userName = "sampleUser";
    Blog blog = new Blog(id, comments, userName);
    assertEquals(id, blog.getId());
    assertNull(blog.getTitle()); // Assuming title is not set in this constructor
    assertNull(blog.getAuthor()); // Assuming author is not set in this constructor
    assertNull(blog.getDescription()); 
    assertNull(blog.getTags()); 
    assertNull(blog.getUrl()); 
    assertNull(blog.getTime()); 
    assertEquals(comments, blog.getComments());
    assertEquals(userName, blog.getUserName());
    assertNull(blog.getUserProfile()); 
}

    
}
