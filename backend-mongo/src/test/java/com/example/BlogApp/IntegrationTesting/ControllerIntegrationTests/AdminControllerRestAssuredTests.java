package com.example.BlogApp.IntegrationTesting.ControllerIntegrationTests;
import io.restassured.RestAssured;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class AdminControllerRestAssuredTests {

    private String authToken="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NjkwNjc3MCwiZXhwIjoxNjk2OTc4NzcwfQ.4x3Rq1rsyHZtInRqFCFv5OR9dlbcpc-pApHNTAlUYzn2E_9sHOVnqVldwsOSyl4-Bx1GvNe2cEj52P_x1w9bjg";

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "http://localhost:8080";
    }

    @Test
    public void testListAllUsers() {
        given()
            .header("Authorization", "Bearer " + authToken)
        .when()
            .get("/blogs/users")
        .then()
            .statusCode(200)
            .body("size()", greaterThan(0));
    }

    @Test
    public void testUpdateCanWriteBlog() {
        given()
            .header("Authorization", "Bearer " + authToken)
            .param("userId", "6524c046687d882f2356898a")
            .param("canWriteBlog", "true")
        .when()
            .post("/blogs/update-can-write-blog")
        .then()
            .statusCode(200)
            .body(equalTo("{\"message\": \"canWriteBlog updated successfully\"}"));
    }

    @Test
    public void testEnableProfile() {
        given()
            .header("Authorization", "Bearer " + authToken)
        .when()
            .post("/blogs/enable-profile/{userId}", "6524c046687d882f2356898a")
        .then()
            .statusCode(200)
            .body(equalTo("{\"message\": \"User profile enabled.\"}"));
    }

    @Test
    public void testDisableProfile() {
        given()
            .header("Authorization", "Bearer " + authToken)
        .when()
            .post("/blogs/disable-profile/{userId}", "6524c046687d882f2356898a")
        .then()
            .statusCode(200)
            .body(equalTo("{\"message\": \"User profile disabled.\"}"));
    }
}




