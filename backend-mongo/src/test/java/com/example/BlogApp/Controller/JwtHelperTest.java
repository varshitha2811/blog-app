package com.example.BlogApp.Controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyCollection;
import static org.mockito.Mockito.*;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.BlogApp.Security.JWTHelper;
import com.example.BlogApp.Service.CustomUserDetails;

import io.jsonwebtoken.Claims;

public class JwtHelperTest {

    private JWTHelper jwtHelper;
    private UserDetails userDetails;

    @BeforeEach
    public void setUp() {
        jwtHelper = new JWTHelper();
        userDetails = new User("testUser", "password", Collections.emptyList());
    }

    @Test
    public void testGenerateValidToken() {
        String token = jwtHelper.generateToken(userDetails);
        assertNotNull(token);
        assertTrue(jwtHelper.validateToken(token, userDetails));
    }

    // @Test
    // public void testGenerateTokenWithClaims() {
    // // Assuming UserDetails has additional claims
    // UserDetails userDetailsWithClaims = mock(UserDetails.class);
    // when(userDetailsWithClaims.getUsername()).thenReturn("testUser");
    // when(userDetailsWithClaims.getPassword()).thenReturn("password");

    // // Mock additional claims
    // Map<String, Object> customClaims = new HashMap<>();
    // customClaims.put("someClaim", "someValue");

    // String token = jwtHelper.generateToken(userDetailsWithClaims);
    // assertNotNull(token);
    // }

    @Test
    public void testGenerateTokenTime() {
        String token = jwtHelper.generateToken(userDetails);
        Date issuedAt = jwtHelper.getClaimFromToken(token, Claims::getIssuedAt);
        assertNotNull(issuedAt);
        assertTrue(issuedAt.before(new Date()));
    }

    @Test
    public void testGenerateTokenExpiryTime() {
        String token = jwtHelper.generateToken(userDetails);
        Date expiryDate = jwtHelper.getExpirationDateFromToken(token);
        assertNotNull(expiryDate);
        assertTrue(expiryDate.after(new Date()));
    }

    @Test
    public void testGenerateTokenSignature() {
        String token = jwtHelper.generateToken(userDetails);
        SecretKey key = jwtHelper.getKey();
        assertTrue(jwtHelper.verifyTokenSignature(token, key));
    }
}
