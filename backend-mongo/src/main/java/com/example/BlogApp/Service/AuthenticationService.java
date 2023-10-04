package com.example.BlogApp.Service;


public interface AuthenticationService {

    String login(String username, String password);

    boolean isAuthenticated();
}
