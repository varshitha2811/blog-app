package com.example.BlogApp.IntegrationTesting.ControllerIntegrationTests;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import io.restassured.response.Response;
public class UserControllerRestAssuredTests {
	@Test
	public void testGetCurrentUser() {
		given().auth().none()
				.when().get("/current-user").then().statusCode(401); 
	}
	@Test
    public void testGetCurrentUserAuthenticatedWithToken() {
        String jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJydWJ5bWluayIsImlhdCI6MTY5Njg1MDYxNSwiZXhwIjoxNjk2OTIyNjE1fQ.bKcwlwTXKZU4tRHXAzNqPK1EvDcY4eUuxmnSovRMwgkP06xJAWx_Iq3f3Q6uYgzahreE3Lf4GrXTNNL4u-S7nw";
        Response response = given()
            .header("Authorization", "Bearer " + jwtToken) 
        .when()
            .get("/current-user");
        System.out.println("Response Body: " + response.body().asString());
        response.then()
            .statusCode(200)
            .contentType(ContentType.JSON)
            .body("name", notNullValue())
            .body("userName", notNullValue());
    }
	@Test
	public void testGetCurrentUserPrincipalNotUserDetails() {
		given().auth().basic("invalidUser", "invalidPassword").when().get("/current-user").then().statusCode(401);
	}
}
















