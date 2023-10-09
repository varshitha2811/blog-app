package com.example.BlogApp.UnitTesting;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.JwtLoginRequest;

public class JwtLoginRequestTest {
    @Test
    public void testGetUserName() {
        JwtLoginRequest request = new JwtLoginRequest();
        request.setuserName("testUser");
        String result = request.getUserName();
        assertEquals("testUser", result);
    }

    @Test
    public void testSetUserName() {
        JwtLoginRequest request = new JwtLoginRequest();
        request.setuserName("testUser");
        assertEquals("testUser", request.getUserName());
    }

    @Test
    public void testGetPassword() {
        JwtLoginRequest request = new JwtLoginRequest();
        request.setPassword("testPassword");
        String result = request.getPassword();
        assertEquals("testPassword", result);
    }

    @Test
    public void testSetPassword() {
        JwtLoginRequest request = new JwtLoginRequest();
        request.setPassword("testPassword");
        assertEquals("testPassword", request.getPassword());
    }
}
