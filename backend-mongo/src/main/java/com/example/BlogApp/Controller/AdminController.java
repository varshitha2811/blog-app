package com.example.BlogApp.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.repo.UserReposiotory;

@RestController
@CrossOrigin(origins = "http://localhost:5000/blogs")
@RequestMapping("/blogs")
public class AdminController implements WebMvcConfigurer {

    
    @Autowired
    private UserReposiotory userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AdminController(UserReposiotory userRepository) {
        this.userRepository = userRepository;

    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:5000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("*").allowedOrigins("*");
        ;
    }
    @GetMapping("/users")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> listAllUsers() {
    try {
        List<User> users = userRepository.findAll();
        List<User> filteredUsers = new ArrayList<>();

        for (User user : users) {
            if (!user.getUsername().equals("admin")) {
                filteredUsers.add(user);
            }
        }

        if (filteredUsers.isEmpty()) {
            return new ResponseEntity<>("No users found", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(filteredUsers, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>("Error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    // @GetMapping("/users")
    // @PreAuthorize("hasRole('ADMIN')")
    // public ResponseEntity<List<User>> listAllUsers() {
    //     try {
    //         List<User> users = userRepository.findAll();
    //         List<User> filteredUsers = new ArrayList<>();

    //         for (User user : users) {
    //             if (!user.getUsername().equals("admin")) {
    //                 filteredUsers.add(user);
    //             }
    //         }

    //         if (filteredUsers.isEmpty()) {
    //             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    //         }

    //         return new ResponseEntity<>(filteredUsers, HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/update-can-write-blog")
    public ResponseEntity<?> updateCanWriteBlog(@RequestParam String userId,
            @RequestParam boolean canWriteBlog) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setCanWriteBlog(canWriteBlog);
        userRepository.save(user);

        return ResponseEntity.ok("{\"message\": \"canWriteBlog updated successfully\"}");
    }
    

    // @PostMapping("/disable-profile/{userId}")
    // @PreAuthorize("hasRole('ADMIN')")
    // @CrossOrigin(origins = "http://localhost:5000")
    // public ResponseEntity<String> disableProfile(@PathVariable String userId) {
    //     System.out.println("Trying to disable profile for user with ID: " + userId);
    //     User user = userRepository.findById(userId).orElse(null);
    //     if (user != null) {
    //         user.setProfileEnabled(false);
    //         userRepository.save(user);
    //         return ResponseEntity.ok("{\"message\": \"User profile disabled.\"}");
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    //     }
    // }

    
    // @PostMapping("/enable-profile/{userId}")
    // @PreAuthorize("hasRole('ADMIN')")
    // @CrossOrigin(origins = "http://localhost:5000")
    // public ResponseEntity<String> enableProfile(@PathVariable String userId) {
    //     User user = userRepository.findById(userId).orElse(null);
    //     if (user != null) {
    //         user.setProfileEnabled(true);
    //         userRepository.save(user);
    //         return ResponseEntity.ok("{\"message\": \"User profile enabled.\"}");
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found.\"}");
    //     }
    // }
    @PostMapping("/enable-profile/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:5000")
    public ResponseEntity<String> enableProfile(@PathVariable String userId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user != null) {
        user.setProfileEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok("{\"message\": \"User profile enabled.\"}");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found.\"}");
    }
}
@PostMapping("/disable-profile/{userId}")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5000")
public ResponseEntity<String> disableProfile(@PathVariable String userId) {
    Optional<User> optionalUser = userRepository.findById(userId);
    if (!optionalUser.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"User not found.\"}");
    }

    User user = optionalUser.get();
    user.setProfileEnabled(false);
    userRepository.save(user);

    return ResponseEntity.ok("{\"message\": \"User profile disabled.\"}");
}


}
