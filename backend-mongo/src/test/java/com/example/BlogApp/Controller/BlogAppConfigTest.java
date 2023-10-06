package com.example.BlogApp.Controller;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.BlogApp.config.BlogAppConfig;

public class BlogAppConfigTest {

    @Test
    void testPasswordEncoder() {

        BlogAppConfig blogAppConfig = new BlogAppConfig();
        PasswordEncoder passwordEncoder = blogAppConfig.passwordEncoder();
        assertNotNull(passwordEncoder);
        assertTrue(passwordEncoder instanceof BCryptPasswordEncoder);
    }

    @Test
    void testAuthenticationManager() throws Exception {
        AuthenticationConfiguration authenticationConfiguration = mock(AuthenticationConfiguration.class);
        AuthenticationManager expectedAuthManager = mock(AuthenticationManager.class);
        when(authenticationConfiguration.getAuthenticationManager()).thenReturn(expectedAuthManager);

        BlogAppConfig blogAppConfig = new BlogAppConfig();
        AuthenticationManager authenticationManager = blogAppConfig.authenticationManager(authenticationConfiguration);
        assertNotNull(authenticationManager);
        assertEquals(expectedAuthManager, authenticationManager);
        verify(authenticationConfiguration, times(1)).getAuthenticationManager();
    }
}