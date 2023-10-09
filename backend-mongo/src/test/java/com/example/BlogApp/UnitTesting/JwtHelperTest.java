package com.example.BlogApp.UnitTesting;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Collections;
import java.util.Date;

import javax.crypto.SecretKey;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.BlogApp.Security.JWTHelper;

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
