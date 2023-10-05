package com.example.BlogApp;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Entity.UserProfile;

class UserTest {
  @Test
    void testGetId() {
        UserProfile userProfile = new UserProfile();
        userProfile.setId("12345");
        String id = userProfile.getId();
        assertEquals("12345", id);
    }

    @Test
    void testSetId() {
        UserProfile userProfile = new UserProfile();
        userProfile.setId("54321");
        assertEquals("54321", userProfile.getId());
    }

    @Test
    void testGetUser() {
        User user = new User();
        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);
        User result = userProfile.getUser();
        assertEquals(user, result);
    }

    @Test
    void testSetUser() {
        User user = new User();
        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);
        assertEquals(user, userProfile.getUser());
    }

    @Test
    void testGetBlogs() {
        List<Blog> blogs = new ArrayList<>();
        blogs.add(new Blog());
        UserProfile userProfile = new UserProfile();
        userProfile.setBlogs(blogs);
        List<Blog> result = userProfile.getBlogs();
        assertEquals(blogs, result);
    }

    @Test
    void testSetBlogs() {
        List<Blog> blogs = new ArrayList<>();
        blogs.add(new Blog());
        UserProfile userProfile = new UserProfile();
        userProfile.setBlogs(blogs);
        assertEquals(blogs, userProfile.getBlogs());
    }
    @Test
    void testIsProfileEnabled() {
        User user = new User();
        user.setProfileEnabled(true);
        boolean profileEnabled = user.isProfileEnabled();
        assertTrue(profileEnabled);
    }

    @Test
    void testSetProfileEnabled() {
        User user = new User();
        user.setProfileEnabled(true);
        assertTrue(user.isProfileEnabled());
    }

    @Test
    void testIsWriteBlogEnabled() {
        User user = new User();
        user.setWriteBlogEnabled(true);
        boolean writeBlogEnabled = user.isWriteBlogEnabled();
        assertTrue(writeBlogEnabled);
    }

    @Test
    void testSetWriteBlogEnabled() {
        User user = new User();
        user.setWriteBlogEnabled(true);
        assertTrue(user.isWriteBlogEnabled());
    }

    @Test
    void testGetAuthorities() {
        User user = new User();
        Set<UserRole> roles = new HashSet<>();
        roles.add(UserRole.ROLE_ADMIN);
        roles.add(UserRole.ROLE_USER);
        user.setRoles(roles);
        Set<String> authorities = user.getAuthorities().stream()
                .map(Object::toString)
                .collect(Collectors.toSet());
        assertTrue(authorities.contains("ROLE_ADMIN"));
        assertTrue(authorities.contains("ROLE_USER"));
    }

    @Test
    void testGetUserProfile() {
        User user = new User();
        UserProfile userProfile = new UserProfile();
        user.setUserProfile(userProfile);
        UserProfile result = user.getUserProfile();
        assertEquals(userProfile, result);
    }

    @Test
    void testSetUserProfile() {
        User user = new User();
        UserProfile userProfile = new UserProfile();
        user.setUserProfile(userProfile);
        assertEquals(userProfile, user.getUserProfile());
    }
}
