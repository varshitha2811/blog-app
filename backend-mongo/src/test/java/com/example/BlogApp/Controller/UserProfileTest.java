package com.example.BlogApp.Controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.Entity.JwtResponse;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Entity.UserProfile;

import java.util.ArrayList;
import java.util.List;

public class UserProfileTest {

    @Test
    void testUserProfileConstructorWithId() {
        // Arrange
        User user = new User();
        List<Blog> blogs = new ArrayList<>();
        UserProfile userProfile = new UserProfile("1", user, blogs);

        // Act & Assert
        assertEquals("1", userProfile.getId());
        assertEquals(user, userProfile.getUser());
        assertEquals(blogs, userProfile.getBlogs());
    }

    @Test
    void testUserProfileConstructorWithoutId() {
        // Arrange
        User user = new User();
        List<Blog> blogs = new ArrayList<>();
        UserProfile userProfile = new UserProfile(user, blogs);

        // Act & Assert
        assertNull(userProfile.getId());
        assertEquals(user, userProfile.getUser());
        assertEquals(blogs, userProfile.getBlogs());
    }

    @Test
    void testSetId() {
        // Arrange
        UserProfile userProfile = new UserProfile();
        userProfile.setId("2");

        // Act & Assert
        assertEquals("2", userProfile.getId());
    }

    @Test
    void testSetUser() {
        // Arrange
        UserProfile userProfile = new UserProfile();
        User user = new User();
        userProfile.setUser(user);

        // Act & Assert
        assertEquals(user, userProfile.getUser());
    }

    @Test
    void testSetBlogs() {
        // Arrange
        UserProfile userProfile = new UserProfile();
        List<Blog> blogs = new ArrayList<>();
        userProfile.setBlogs(blogs);

        // Act & Assert
        assertEquals(blogs, userProfile.getBlogs());
    }

    @Test
    void testEqualsAndHashCode() {
        // Arrange
        User user1 = new User("1", "John", "john.doe", "password123");
        User user2 = new User("2", "Jane", "jane.doe", "password456");
        List<Blog> blogs1 = new ArrayList<>();
        List<Blog> blogs2 = new ArrayList<>();
        UserProfile userProfile1 = new UserProfile("1", user1, blogs1);
        UserProfile userProfile2 = new UserProfile("1", user1, blogs1); // Same as userProfile1
        UserProfile userProfile3 = new UserProfile("2", user2, blogs2); // Different id and user

        // Act & Assert
        assertEquals(userProfile1, userProfile2);
        assertNotEquals(userProfile1, userProfile3);
        assertEquals(userProfile1.hashCode(), userProfile2.hashCode());
        assertNotEquals(userProfile1.hashCode(), userProfile3.hashCode());
    }
}
