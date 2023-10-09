package com.example.BlogApp.UnitTesting;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.example.BlogApp.Entity.Comment;

class CommentTest {

    @Test
    void testGetName() {
        Comment comment = new Comment("John Doe", "This is a comment");
        String name = comment.getName();
        assertEquals("John Doe", name);
    }

    @Test
    void testSetName() {
        Comment comment = new Comment();
        comment.setName("Jane Doe");
        assertEquals("Jane Doe", comment.getName());
    }

    @Test
    void testGetComment() {
        Comment comment = new Comment("John Doe", "This is a comment");
        String commentText = comment.getComment();
        assertEquals("This is a comment", commentText);
    }

    @Test
    void testSetComment() {
        Comment comment = new Comment();

        // Act
        comment.setComment("Another comment");

        // Assert
        assertEquals("Another comment", comment.getComment());
    }

    @Test
    void testGetId() {
        // Arrange
        Comment comment = new Comment();

        // Act
        String id = comment.getId();

        // Assert
        assertNull(id); // Since id is not set, it should be null
    }

    @Test
    void testSetId() {
        // Arrange
        Comment comment = new Comment();

        // Act
        comment.setId("12345");

        // Assert
        assertEquals("12345", comment.getId());
    }
}
