
package com.example.BlogApp.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.BlogApp.UserRole;
import com.example.BlogApp.Entity.User;
import com.example.BlogApp.repo.UserReposiotory;

@Service
public class UsersService {

    @Autowired
    private UserReposiotory userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsersService() {
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    @Transactional
    public User createUser(User user) {
    String password = user.getPassword();
    if (password == null || password.isEmpty()) {
        throw new IllegalArgumentException("Password cannot be empty");
    }

    userRepository.findByUserName(user.getUsername());
    boolean isUserFirst = userRepository.count() == 0;
    if (isUserFirst) {
        user.setRoles(new HashSet<>(Arrays.asList(UserRole.ROLE_ADMIN)));
    } else {
        user.setRoles(Collections.singleton(UserRole.ROLE_USER));
    }

    user.setPassword(passwordEncoder.encode(password));
    return userRepository.save(user);
}

    // @Transactional
    // public User createUser(User user) {
    //     if (user.getPassword() == null || user.getPassword().isEmpty()) {
    //         throw new IllegalArgumentException("Password cannot be empty");
    //     }
    //     userRepository.findByUserName(user.getUsername());
    //     boolean isUserFirst = userRepository.count() == 0;
    //     if (isUserFirst) {
    //         user.setRoles(new HashSet<>(Arrays.asList(UserRole.ROLE_ADMIN)));
    //     } else {
    //         user.setRoles(Collections.singleton(UserRole.ROLE_USER));
    //     }
    //     user.setPassword(passwordEncoder.encode(user.getPassword()));
    //     return userRepository.save(user);
    // }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
