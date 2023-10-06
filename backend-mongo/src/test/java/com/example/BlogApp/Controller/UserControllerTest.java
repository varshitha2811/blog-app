package com.example.BlogApp.Controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.BlogApp.Entity.User;

public class UserControllerTest {


    private final UserController userController = new UserController();

    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
    }

@Test
void testGetCurrentUser_UnauthenticatedUser() {
    SecurityContextHolder.clearContext();
    ResponseEntity<User> responseEntity = userController.getCurrentUser();
    assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
    assertNull(responseEntity.getBody());
    if (responseEntity.getHeaders().getFirst("Principal-Type") != null) {
        assertEquals("Unauthenticated", responseEntity.getHeaders().getFirst("Principal-Type"));
    }
}
    @Test
    void testGetCurrentUser_NonCustomUserDetails() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("someUser", null);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        ResponseEntity<User> responseEntity = userController.getCurrentUser();
        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
    }
    
}