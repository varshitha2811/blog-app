package com.example.BlogApp.Controller;


import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.BlogApp.config.BlogAppConfig;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BlogAppConfigTest {

    @Test
    void testPasswordEncoder() {
     
        BlogAppConfig blogAppConfig = new BlogAppConfig();

        // Act
        PasswordEncoder passwordEncoder = blogAppConfig.passwordEncoder();

        // Assert
        assertNotNull(passwordEncoder);
        assertTrue(passwordEncoder instanceof BCryptPasswordEncoder);
    }

    @Test
    void testAuthenticationManager() throws Exception {
        // Arrange
        AuthenticationConfiguration authenticationConfiguration = mock(AuthenticationConfiguration.class);
        AuthenticationManager expectedAuthManager = mock(AuthenticationManager.class);
        when(authenticationConfiguration.getAuthenticationManager()).thenReturn(expectedAuthManager);

        BlogAppConfig blogAppConfig = new BlogAppConfig();

        // Act
        AuthenticationManager authenticationManager = blogAppConfig.authenticationManager(authenticationConfiguration);

        // Assert
        assertNotNull(authenticationManager);
        assertEquals(expectedAuthManager, authenticationManager);

        // Verify that getAuthenticationManager method is called on the AuthenticationConfiguration
        verify(authenticationConfiguration, times(1)).getAuthenticationManager();
    }
}
