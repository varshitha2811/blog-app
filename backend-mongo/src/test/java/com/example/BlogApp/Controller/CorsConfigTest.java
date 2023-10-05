package com.example.BlogApp.Controller;


import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.BlogApp.config.CorsConfig;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CorsConfigTest {

    @Test
    void testCorsConfigurationSource() {
        // Arrange
        CorsConfig corsConfig = new CorsConfig();

        // Act
        CorsConfigurationSource corsConfigurationSource = corsConfig.corsConfigurationSource();

        // Assert
        assertNotNull(corsConfigurationSource);
        assertTrue(corsConfigurationSource instanceof UrlBasedCorsConfigurationSource);
    }

    @Test
    void testCorsConfiguration() {
        // Arrange
        CorsConfig corsConfig = new CorsConfig();

        // Act
        CorsConfiguration configuration = corsConfig.corsConfigurationSource().getCorsConfiguration(getMockHttpServletRequest());

        // Assert
        assertNotNull(configuration);
        assertEquals(Arrays.asList("http://localhost:5000"), configuration.getAllowedOrigins());
        assertEquals(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"), configuration.getAllowedMethods());
        assertEquals(Arrays.asList("*"), configuration.getAllowedHeaders());
        assertTrue(configuration.getAllowCredentials());
    }

    private MockHttpServletRequest getMockHttpServletRequest() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        // Set any necessary attributes, headers, etc. for the request
        return request;
    }
}
