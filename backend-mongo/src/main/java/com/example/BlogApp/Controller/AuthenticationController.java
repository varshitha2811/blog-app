package com.example.BlogApp.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BlogApp.Entity.JwtLoginRequest;
import com.example.BlogApp.Entity.JwtResponse;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Security.JWTHelper;
import com.example.BlogApp.Service.UsersService;


@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JWTHelper helper;
    private final UsersService userService;
    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    public AuthenticationController(UserDetailsService userDetailsService,
                                     AuthenticationManager manager,
                                     JWTHelper helper,
                                     UsersService userService) {
        this.userDetailsService = userDetailsService;
        this.manager = manager;
        this.helper = helper;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> loginUser(@RequestBody JwtLoginRequest request) {
        this.doAuthenticate(request.getUserName(), request.getPassword());
        logger.info("Authentication done");
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
        String token = this.helper.generateToken(userDetails);
        JwtResponse response = new JwtResponse();
        response.setJwttoken(token);
        response.setUsername(userDetails.getUsername());
    return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String UserName, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(UserName,
                password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    protected boolean isUserAlreadyRegistered(String UserName) {
        User existingUser = userService.findByUserName(UserName);
        return existingUser != null;
    }
    // private boolean isUserAlreadyRegistered(String UserName) {
    //     User existingUser = userService.findByUserName(UserName);
    //     return existingUser != null;
    // }

	@PostMapping("/create-user")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		System.out.println("Entering");
		if (isUserAlreadyRegistered(user.getUserName())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this UserName already exists");
		}
		System.out.println("creating user");
		User createdUser = userService.createUser(user);
		String jwtToken = helper.generateToken(user);
		System.out.println(jwtToken);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}
}
