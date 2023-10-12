package com.example.BlogApp.UnitTesting;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Controller.AuthenticationController;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Service.UsersService;
public class AuthenticationControllerTest {
    @Test
    void testIsUserAlreadyRegistered_UserExists() {
        UsersService userService = mock(UsersService.class);
        AuthenticationController controller = new AuthenticationController(null, null, null, userService);
        when(userService.findByUserName(anyString())).thenReturn(new User());
        boolean result = controller.isUserAlreadyRegistered("testUser");
        assertTrue(result);
    }

    @Test
    void testIsUserAlreadyRegistered_UserDoesNotExist() {
        UsersService userService = mock(UsersService.class);
        AuthenticationController controller = new AuthenticationController(null, null, null, userService);
        when(userService.findByUserName(anyString())).thenReturn(null);
        boolean result = controller.isUserAlreadyRegistered("testUser");
        assertFalse(result);
    }
    
}
