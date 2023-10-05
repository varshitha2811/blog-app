package com.example.BlogApp.Controller;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.example.BlogApp.UserRole;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Entity.UserProfile;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    void testConstructorAndGetters() {
        // Arrange
        String id = "1";
        String name = "John Doe";
        String userName = "john.doe";
        String password = "password123";

        // Act
        User user = new User(id, name, userName, password);

        // Assert
        assertEquals(id, user.getId());
        assertEquals(name, user.getName());
        assertEquals(userName, user.getUserName());
        assertEquals(password, user.getPassword());
        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }

   @Test
void testUserProfile() {
    // Arrange
    User user = new User();
    UserProfile userProfile = new UserProfile("1", user, new ArrayList<>()); // Provide correct constructor parameters

    // Act
    user.setUserProfile(userProfile);

    // Assert
    assertEquals(userProfile, user.getUserProfile());
}

@Test
void testAuthorities() {
    // Arrange
    Set<UserRole> roles = new HashSet<>(Collections.singletonList(UserRole.ROLE_USER));
    User user = new User();
    user.setRoles(roles);

    // Act
    Collection<? extends GrantedAuthority> authorities = user.getAuthorities();

    // Assert
    assertTrue(authorities.stream()
            .anyMatch(authority -> authority.getAuthority().equals(UserRole.ROLE_USER.name())));
}


    @Test
    void testEnableDisableFeatures() {
        // Arrange
        User user = new User();

        // Act
        user.setProfileEnabled(false);
        user.setWriteBlogEnabled(false);

        // Assert
        assertFalse(user.isProfileEnabled());
        assertFalse(user.isWriteBlogEnabled());
    }

    @Test
    void testCanWriteBlog() {
        // Arrange
        User user = new User();

        // Act
        user.setCanWriteBlog(true);

        // Assert
        assertTrue(user.isCanWriteBlog());
    }
}
