package com.example.BlogApp;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.AuthenticationException;

import com.example.BlogApp.Security.JWTAuthEnteryPoint;

import jakarta.servlet.http.HttpServletResponse;

class JWTAuthEntryPointTest {

  @Test
    void commence() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();
        AuthenticationException authException = new AuthenticationException("Unauthorized") {};

        JWTAuthEnteryPoint entryPoint = new JWTAuthEnteryPoint();
        entryPoint.commence(request, response, authException);

        String expectedMessage = "Access Denied !! Unauthorized";
        String actualMessage = response.getContentAsString();

        assert response.getStatus() == HttpServletResponse.SC_UNAUTHORIZED;
        assert actualMessage.trim().equals(expectedMessage);
    }
}