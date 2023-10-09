package com.example.BlogApp.UnitTesting;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Entity.UserProfile;

public class UserProfileTest {

    @Test
    void testUserProfileConstructorWithId() {
        User user = new User();
        List<Blog> blogs = new ArrayList<>();
        UserProfile userProfile = new UserProfile("1", user, blogs);
        assertEquals("1", userProfile.getId());
        assertEquals(user, userProfile.getUser());
        assertEquals(blogs, userProfile.getBlogs());
    }

    @Test
    void testUserProfileConstructorWithoutId() {
        User user = new User();
        List<Blog> blogs = new ArrayList<>();
        UserProfile userProfile = new UserProfile(user, blogs);
        assertNull(userProfile.getId());
        assertEquals(user, userProfile.getUser());
        assertEquals(blogs, userProfile.getBlogs());
    }

    @Test
    void testSetId() {
        UserProfile userProfile = new UserProfile();
        userProfile.setId("2");
        assertEquals("2", userProfile.getId());
    }

    @Test
    void testSetUser() {
        UserProfile userProfile = new UserProfile();
        User user = new User();
        userProfile.setUser(user);
        assertEquals(user, userProfile.getUser());
    }

    @Test
    void testSetBlogs() {

        UserProfile userProfile = new UserProfile();
        List<Blog> blogs = new ArrayList<>();
        userProfile.setBlogs(blogs);
        assertEquals(blogs, userProfile.getBlogs());
    }

    @Test
    void testEqualsAndHashCode() {
        User user1 = new User("1", "John", "john.doe", "password123");
        User user2 = new User("2", "Jane", "jane.doe", "password456");
        List<Blog> blogs1 = new ArrayList<>();
        List<Blog> blogs2 = new ArrayList<>();
        UserProfile userProfile1 = new UserProfile("1", user1, blogs1);
        UserProfile userProfile2 = new UserProfile("1", user1, blogs1);
        UserProfile userProfile3 = new UserProfile("2", user2, blogs2); 
        assertEquals(userProfile1, userProfile2);
        assertNotEquals(userProfile1, userProfile3);
        assertEquals(userProfile1.hashCode(), userProfile2.hashCode());
        assertNotEquals(userProfile1.hashCode(), userProfile3.hashCode());
    }
}
