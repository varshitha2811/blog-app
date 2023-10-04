package com.example.blogappsql.Service;

public interface AuthenticationService {
String login(String username, String password);
boolean isAuthenticated();
}
