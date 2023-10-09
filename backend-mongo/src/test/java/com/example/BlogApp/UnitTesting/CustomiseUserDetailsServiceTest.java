package com.example.BlogApp.UnitTesting;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Service.CustomiseUserDetailsService;
import com.example.BlogApp.repo.UserReposiotory;

@ExtendWith(MockitoExtension.class)
public class CustomiseUserDetailsServiceTest {

    @Mock
    private UserReposiotory userRepository;

    @Test
    void testLoadUserByUsername_UserFound() {
        CustomiseUserDetailsService userDetailsService = new CustomiseUserDetailsService(userRepository);
        String username = "testuser";
        User user = new User();
        user.setUserName(username);
        when(userRepository.findByUserName(username)).thenReturn(user);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        assertEquals(username, userDetails.getUsername());
        verify(userRepository, times(1)).findByUserName(username);
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        CustomiseUserDetailsService userDetailsService = new CustomiseUserDetailsService(userRepository);
        String username = "nonexistentuser";
        when(userRepository.findByUserName(username)).thenReturn(null);
        try {
            userDetailsService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            assertEquals("User not found with username: " + username, e.getMessage());
        }

        verify(userRepository, times(1)).findByUserName(username);
    }
}
