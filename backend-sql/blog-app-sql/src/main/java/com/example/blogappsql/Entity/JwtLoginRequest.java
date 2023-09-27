package com.example.blogappsql.Entity;
import java.io.Serializable;

public class JwtLoginRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String UserName;
    private String password;

    // No-argument constructor
    public JwtLoginRequest() {
    	super();
    }

    public JwtLoginRequest(String username, String password) {
    	super();
        this.setuserName(username);
        this.setPassword(password);
    }

    public String getUserName() {
        return this.UserName;
    }

    public void setuserName(String username) {
        this.UserName = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

