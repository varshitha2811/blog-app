package com.example.BlogApp.Entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Document(collection = "UserProfile")
public class UserProfile {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfile that = (UserProfile) o;
        return Objects.equals(id, that.id) &&
               Objects.equals(user, that.user) &&
               Objects.equals(blogs, that.blogs);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, blogs);
    }

    public UserProfile(){}
    public UserProfile(String id, User user, List<Blog> blogs) {
        this.id = id;
        this.user = user;
        this.blogs = blogs;
    }
    public UserProfile(User user, List<Blog> blogs) {
        this.user = user;
        this.blogs = blogs;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<Blog> getBlogs() {
        return blogs;
    }
    public void setBlogs(List<Blog> blogs) {
        this.blogs = blogs;
    }
    @Id
    
    private String id;
    @DBRef
    @JsonIgnore
    private User user;
    @DBRef
    private List<Blog> blogs = new ArrayList<>();
}