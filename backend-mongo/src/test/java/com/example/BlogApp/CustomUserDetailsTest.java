package com.example.BlogApp;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Service.CustomUserDetails;

class CustomUserDetailsTest {

    // @Test
    // void testGetAuthorities() {
    //     User user = new User();
    //     Set<UserRole> roles = Set.of(UserRole.ROLE_USER, UserRole.ROLE_ADMIN); 
    //     user.setRoles(roles);

    //     CustomUserDetails userDetails = new CustomUserDetails(user);

    //     Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

    //     assertTrue(authorities.contains(new SimpleGrantedAuthority(UserRole.ROLE_USER)));
    //     assertTrue(authorities.contains(new SimpleGrantedAuthority("ADMIN")));
    // }

    @Test
    void testGetPassword() { 
        User user = new User();
        user.setPassword("password123");
        
        CustomUserDetails userDetails = new CustomUserDetails(user);
        assertEquals("password123", userDetails.getPassword());
    }

    @Test
    void testGetUsername() {
        User user = new User();
        user.setUserName("john_doe");
        
        CustomUserDetails userDetails = new CustomUserDetails(user);
        assertEquals("john_doe", userDetails.getUsername());
    }

    @Test
    void testIsAccountNonExpired() {
        CustomUserDetails userDetails = new CustomUserDetails(new User());
        assertTrue(userDetails.isAccountNonExpired());
    }

    @Test
    void testIsAccountNonLocked() {
        CustomUserDetails userDetails = new CustomUserDetails(new User());
        assertTrue(userDetails.isAccountNonLocked());
    }

    @Test
    void testIsCredentialsNonExpired() {
        CustomUserDetails userDetails = new CustomUserDetails(new User());
        assertTrue(userDetails.isCredentialsNonExpired());
    }

    @Test
    void testIsEnabled() {
        CustomUserDetails userDetails = new CustomUserDetails(new User());
        assertTrue(userDetails.isEnabled());
    }

    @Test
    void testUserDisabled() {
        CustomUserDetails userDetails = new CustomUserDetails(new User());
        assertFalse(userDetails.userDisabled());
    }

    @Test
    void testGetCustomClaims() {
        User user = Mockito.mock(User.class);
        Map<String, Object> customClaims = Map.of("claim1", "value1", "claim2", "value2");
        Mockito.when(user.getCustomClaims()).thenReturn(customClaims);
        CustomUserDetails userDetails = new CustomUserDetails(user);
        assertEquals(customClaims, userDetails.getCustomClaims());
    }
    // @Test
    // void testGetAuthorities() {
    //     // Create a user with some roles
    //     User user = new User();
    //     Set<UserRole> roles = Set.of(UserRole.ROLE_ADMIN, UserRole.ROLE_USER);
    //     user.setRoles(roles);
        
        
    //     CustomUserDetails userDetails = new CustomUserDetails(user);

    //     // Test if the authorities are correctly mapped
    //     boolean adminAuthorityPresent = userDetails.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ADMIN"));
    //     boolean userAuthorityPresent = userDetails.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("USER"));

    //     assertTrue(adminAuthorityPresent);
    //     assertTrue(userAuthorityPresent);
    // }

    @Test
    void testGetUser() {
        User user = new User();
        user.setUserName("john_doe");
        
        CustomUserDetails userDetails = new CustomUserDetails(user);
        assertEquals(user, userDetails.getUser());
    }
}

