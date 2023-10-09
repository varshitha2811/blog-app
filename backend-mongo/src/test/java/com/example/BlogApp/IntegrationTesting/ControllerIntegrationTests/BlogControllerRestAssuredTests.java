package com.example.BlogApp.IntegrationTesting.ControllerIntegrationTests;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import com.example.BlogApp.Entity.Blog;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

public class BlogControllerRestAssuredTests {
     @BeforeClass
    public static void setup() {
        RestAssured.baseURI = "http://localhost:8080";
    }

    @Test
    public void testGetAllBlogPosts() {
        given()
            .when()
                .get("/blogs/home")
            .then()
                .statusCode(200)
                .body("size()", greaterThan(0));
    }
    @Test
    public void testDeleteBlog() {
        String blogId = "64ff547d4ce8e184e47f0b8d";
        given()
            .when()
                .delete("/blogs/" + blogId)
            .then()
                .statusCode(200);
    }
    @Test
    public void testGetBlogById() {
        String existingBlogId = "64ff547d4ce8e184e47f0b8a";

        given()
        .when()
            .get("/blogs/{id}", existingBlogId)
        .then()
            .statusCode(200)
            .body("id", equalTo(existingBlogId)); 
    }

    @Test
    public void testGetNonexistentBlogById() {
        String nonexistentBlogId = "64ff547d4ce8e184e47djdskj";
        given()
        .when()
            .get("/blogs/{id}", nonexistentBlogId)
        .then()
            .statusCode(404); 
    }
     @Test
    public void testUpdateBlog() {
        String blogId = "651b914e4ea199017a1c22f2"; 
        Blog updatedBlog = new Blog();
        updatedBlog.setTitle("Updated Title");
        updatedBlog.setAuthor("Updated Author");
        updatedBlog.setDescription(Arrays.asList("Description1"));
        updatedBlog.setTags(Arrays.asList("tag1", "tag2"));
        updatedBlog.setUrl("http://updated-url.com");
        updatedBlog.setTime("Updated Time");

        given()
            .contentType(ContentType.JSON)
            .body(updatedBlog)
        .when()
            .put("/blogs/update/{id}", blogId)
        .then()
            .statusCode(200) 
            .body("title", equalTo(updatedBlog.getTitle()))
            .body("author", equalTo(updatedBlog.getAuthor()))
            .body("description", equalTo(updatedBlog.getDescription())) 
            .body("tags", equalTo(updatedBlog.getTags())) 
            .body("url", equalTo(updatedBlog.getUrl()))
            .body("time", equalTo(updatedBlog.getTime()));
    }

    @Test
    public void testSearchBlogs() {
        String searchTerm = "example";
        List<Blog> matchingBlogs = 
            given()
                .baseUri("http://localhost:8080")
                .pathParam("searchTerm", searchTerm)
            .when()
                .get("/blogs/search/{searchTerm}")
            .then()
                .statusCode(200)
                .extract()
                .body()
                .jsonPath()
                .getList(".", Blog.class);
          }
}


 