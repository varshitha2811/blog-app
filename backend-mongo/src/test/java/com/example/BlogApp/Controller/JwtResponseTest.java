package com.example.BlogApp.Controller;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.JwtResponse;

import static org.junit.jupiter.api.Assertions.*;

public class JwtResponseTest {

    @Test
    void testDefaultConstructor() {
        JwtResponse jwtResponse = new JwtResponse();

        assertNotNull(jwtResponse);
        assertNull(jwtResponse.getJwttoken());
        assertNull(jwtResponse.getUsername());
    }

    @Test
    void testParameterizedConstructorAndGetters() {
        String jwtToken = "someJwtToken";
        String username = "john_doe";

        JwtResponse jwtResponse = new JwtResponse(jwtToken, username);

        assertEquals(jwtToken, jwtResponse.getJwttoken());
        assertEquals(username, jwtResponse.getUsername());
    }

    @Test
    void testSetters() {
        JwtResponse jwtResponse = new JwtResponse();
        String jwtToken = "someJwtToken";
        String username = "john_doe";

        jwtResponse.setJwttoken(jwtToken);
        jwtResponse.setUsername(username);

        assertEquals(jwtToken, jwtResponse.getJwttoken());
        assertEquals(username, jwtResponse.getUsername());
    }

    @Test
    void testToString() {
        String jwtToken = "someJwtToken";
        String username = "john_doe";
        JwtResponse jwtResponse = new JwtResponse(jwtToken, username);

        String toStringResult = jwtResponse.toString();
        assertTrue(toStringResult.contains(jwtToken));
        assertTrue(toStringResult.contains(username));
    }

    @Test
    void testEqualsAndHashCode() {
        JwtResponse jwtResponse1 = new JwtResponse("token1", "user1");
        JwtResponse jwtResponse2 = new JwtResponse("token1", "user1");
        JwtResponse jwtResponse3 = new JwtResponse("token2", "user2");

        assertEquals(jwtResponse1, jwtResponse2);
        assertNotEquals(jwtResponse1, jwtResponse3);
        assertEquals(jwtResponse1.hashCode(), jwtResponse2.hashCode());
        assertNotEquals(jwtResponse1.hashCode(), jwtResponse3.hashCode());
    }
}
