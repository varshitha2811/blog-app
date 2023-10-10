package com.example.BlogApp.UnitTesting;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.BlogApp.Controller.AdminController;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.repo.UserReposiotory;

public class AdminControllerTest {

    @Test
    void testUpdateCanWriteBlog_Success() {
        UserReposiotory userRepository = mock(UserReposiotory.class);
        AdminController adminController = new AdminController(userRepository);

        String userId = "123";
        boolean canWriteBlog = true;
        User user = new User("user1", "username","password1");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        ResponseEntity<?> responseEntity = adminController.updateCanWriteBlog(userId, canWriteBlog);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("{\"message\": \"canWriteBlog updated successfully\"}", responseEntity.getBody());
        assertTrue(user.isCanWriteBlog());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testDisableProfile_UserNotFound() {
        UserReposiotory userRepository = mock(UserReposiotory.class);
        AdminController adminController = new AdminController(userRepository);

        String userId = "123";
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        ResponseEntity<String> responseEntity = adminController.disableProfile(userId);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("{\"error\": \"User not found.\"}", responseEntity.getBody());
    }

    @Test
    void testEnableProfile_Success() {
        UserReposiotory userRepository = mock(UserReposiotory.class);
        AdminController adminController = new AdminController(userRepository);

        String userId = "123";
        User user = new User("user1","username", "password1");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        ResponseEntity<String> responseEntity = adminController.enableProfile(userId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("{\"message\": \"User profile enabled.\"}", responseEntity.getBody());
        assertTrue(user.isProfileEnabled());
        verify(userRepository, times(1)).save(user);
    }
}

