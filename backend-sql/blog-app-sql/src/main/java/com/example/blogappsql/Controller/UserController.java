package com.example.blogappsql.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.blogappsql.Entity.User;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {
	@Autowired

	@GetMapping("/current-user")
	public ResponseEntity<User> getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Authentication");
		if (authentication == null || !authentication.isAuthenticated()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		if (authentication.getPrincipal() instanceof User) {
			User userDetails = (User) authentication.getPrincipal();
			User userInfo = new User();
			userInfo.setName(userDetails.getName());
			userInfo.setUserName(userDetails.getUserName());
			return ResponseEntity.ok(userInfo);
		} else {
			System.out.println("Principal is not UserDetails: " + authentication.getPrincipal());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	} 
}
