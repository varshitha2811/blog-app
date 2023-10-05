package com.example.BlogApp.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Service.CustomUserDetails;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
public class UserController {

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication");

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }
        if (authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User userInfo = userDetails.getUser(); // Access the User object directly
            System.out.println("Principal is CustomUserDetails: " +
                    authentication.getPrincipal());
            return ResponseEntity.ok(userInfo);
        } else {
            System.out.println("Principal is not CustomUserDetails: " +
                    authentication.getPrincipal());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
