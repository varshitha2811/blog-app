package com.example.blogappsql.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String author;

    @ElementCollection
    private List<String> description;

    @ElementCollection
    private List<String> tags;

    private String url;
    private String time;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments;

    private String userName;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;

    public Blog(Long id, String title, String author, List<String> description, List<String> tags, String url,
            String time, List<Comment> comments, UserProfile userproflie) {
        super();
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.tags = tags;
        this.url = url;
        this.time = time;
        this.comments = comments;
        this.userProfile = userproflie;
    }

    public Blog(Long id, String title, String author, List<String> description, List<String> tags, String url,
            String time) {
        super();
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.tags = tags;
        this.url = url;
        this.time = time;
    }

    public Blog(Long id, List<Comment> comments, String userName) {
        super();
        this.id = id;
        this.comments = comments;
        this.userName = userName;
    }

    public Blog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<String> getDescription() {
        return description;
    }

    public void setDescription(List<String> description) {
        this.description = description;
    }

    public List<String> getTags() {
        return tags;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
