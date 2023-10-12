package com.example.BlogApp.IntegrationTesting.ControllerIntegrationTests;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

public class AuthenticationControllerRestAssuredTests {
    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "http://localhost:8080";
    }

    @Test
    public void testLoginWithValidCredentials() {
        given()
                .contentType(ContentType.JSON)
                .body("{ \"userName\": \"newUser\", \"password\": \"newPassword\" }")
                .when()
                .post("/auth/login")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("jwttoken", notNullValue())
                .body("username", equalTo("newUser"));
    }

    @Test
    public void testLoginWithInvalidCredentials() {
        given()
                .contentType(ContentType.JSON)
                .body("{ \"userName\": \"invalidUsername\", \"password\": \"invalidPassword\" }")
                .when()
                .post("/auth/login")
                .then()
                .statusCode(200)
                .body(equalTo("Credentials Invalid !!"));
    }

    @Test
    public void testCreateUser() {
        given()
                .contentType(ContentType.JSON)
                .body("{ \"userName\": \"newUser\", \"password\": \"newPassword\", \"name\": \"New User\" }")
                .when()
                .post("/auth/create-user")
                .then()
                .statusCode(409);
    }
}
