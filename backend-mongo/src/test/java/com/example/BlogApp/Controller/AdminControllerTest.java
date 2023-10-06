package com.example.BlogApp.Controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.repo.UserReposiotory;

public class AdminControllerTest {
    @Test
    void testListAllUsers_NoUsers() {

        UserReposiotory userRepository = mock(UserReposiotory.class);
        AdminController adminController = new AdminController(userRepository);

        List<User> emptyList = new ArrayList<>();
        when(userRepository.findAll()).thenReturn(emptyList);
        ResponseEntity<?> responseEntity = adminController.listAllUsers();
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
        assertEquals("No users found", responseEntity.getBody());
    }

    @Test
    void testListAllUsers_WithUsers() {

        UserReposiotory userRepository = mock(UserReposiotory.class);
        AdminController adminController = new AdminController(userRepository);

        List<User> users = new ArrayList<>();
        User user1 = new User();
        user1.setUserName("user1");
        users.add(user1);

        when(userRepository.findAll()).thenReturn(users);
        ResponseEntity<?> responseEntity = adminController.listAllUsers();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(users, responseEntity.getBody());
    }

    @Test
    void testListAllUsers_Exception() {
        // Arrange
        UserReposiotory userRepository = mock(UserReposiotory.class);
        AdminController adminController = new AdminController(userRepository);
    
        when(userRepository.findAll()).thenThrow(new RuntimeException("Error fetching users"));
        ResponseEntity<?> responseEntity = adminController.listAllUsers();
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Error occurred", responseEntity.getBody());
    }

    


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

