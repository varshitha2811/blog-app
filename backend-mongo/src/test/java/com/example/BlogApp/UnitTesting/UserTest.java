package com.example.BlogApp.UnitTesting;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import com.example.BlogApp.UserRole;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Entity.UserProfile;

public class UserTest {

    @Test
    void testConstructorAndGetters() {

        String id = "1";
        String name = "John Doe";
        String userName = "john.doe";
        String password = "password123";
        User user = new User(id, name, userName, password);
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
    User user = new User();
    UserProfile userProfile = new UserProfile("1", user, new ArrayList<>()); 
    user.setUserProfile(userProfile);
    assertEquals(userProfile, user.getUserProfile());
}

@Test
void testAuthorities() {
    Set<UserRole> roles = new HashSet<>(Collections.singletonList(UserRole.ROLE_USER));
    User user = new User();
    user.setRoles(roles);
    Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
    assertTrue(authorities.stream()
            .anyMatch(authority -> authority.getAuthority().equals(UserRole.ROLE_USER.name())));
}


    @Test
    void testEnableDisableFeatures() {
        User user = new User();
        user.setProfileEnabled(false);
        user.setWriteBlogEnabled(false);
        assertFalse(user.isProfileEnabled());
        assertFalse(user.isWriteBlogEnabled());
    }

    @Test
    void testCanWriteBlog() {
    
        User user = new User();
        user.setCanWriteBlog(true);
        assertTrue(user.isCanWriteBlog());
    }
}
