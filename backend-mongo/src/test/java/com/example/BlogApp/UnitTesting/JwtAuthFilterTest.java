package com.example.BlogApp.UnitTesting;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.BlogApp.Security.JWTAuthFilter;
import com.example.BlogApp.Security.JWTHelper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilterTest {

    @Mock
    private JWTHelper jwtHelper;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private Logger logger;

    @InjectMocks
    private JWTAuthFilter jwtAuthFilter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Test
    public void testDoFilterInternal_ValidToken() throws ServletException, IOException {
        MockitoAnnotations.openMocks(this);

        String validToken = "validToken";
        String username = "testUser";

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + validToken);

        when(jwtHelper.getUsernameFromToken(validToken)).thenReturn(username);

        UserDetails userDetails = new User(username, "password", Collections.emptyList());
        when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);

        when(jwtHelper.validateToken(validToken, userDetails)).thenReturn(true);

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        verify(userDetailsService).loadUserByUsername(username);
        verify(response, never()).sendError(anyInt(), anyString());
        verify(filterChain).doFilter(request, response);

    }

}
