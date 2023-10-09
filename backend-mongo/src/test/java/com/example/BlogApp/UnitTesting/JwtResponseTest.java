package com.example.BlogApp.UnitTesting;
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
        String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        String username = "john";

        JwtResponse jwtResponse = new JwtResponse(jwtToken, username);

        assertEquals(jwtToken, jwtResponse.getJwttoken());
        assertEquals(username, jwtResponse.getUsername());
    }

    @Test
    void testSetters() {
        JwtResponse jwtResponse = new JwtResponse();
        String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        String username = "john";

        jwtResponse.setJwttoken(jwtToken);
        jwtResponse.setUsername(username);

        assertEquals(jwtToken, jwtResponse.getJwttoken());
        assertEquals(username, jwtResponse.getUsername());
    }

    @Test
    void testToString() {
        String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        String username = "john";
        JwtResponse jwtResponse = new JwtResponse(jwtToken, username);

        String toStringResult = jwtResponse.toString();
        assertTrue(toStringResult.contains(jwtToken));
        assertTrue(toStringResult.contains(username));
    }

    @Test
    void testEqualsMethod() {
        JwtResponse jwtResponse1 = new JwtResponse("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "dummyUser");
        JwtResponse jwtResponse2 = new JwtResponse("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "dummyUser");

        JwtResponse jwtResponse3 = new JwtResponse("anotherToken", "anotherUser");

        assertTrue(jwtResponse1.equals(jwtResponse2)); 
        assertFalse(jwtResponse1.equals(jwtResponse3)); 
    }

    @Test
    void testEqualsAndHashCode() {
        JwtResponse jwtResponse1 = new JwtResponse("dummyToken1", "dummyUser1");
        JwtResponse jwtResponse2 = new JwtResponse("dummyToken1", "dummyUser1");
        JwtResponse jwtResponse3 = new JwtResponse("dummyToken2", "dummyUser2");

        assertEquals(jwtResponse1, jwtResponse2);
        assertNotEquals(jwtResponse1, jwtResponse3);
        assertEquals(jwtResponse1.hashCode(), jwtResponse2.hashCode());
        assertNotEquals(jwtResponse1.hashCode(), jwtResponse3.hashCode());
    }

}
