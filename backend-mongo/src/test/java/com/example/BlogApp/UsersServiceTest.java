package com.example.BlogApp;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.Service.UsersService;
import com.example.BlogApp.repo.UserReposiotory;

@SpringBootTest
public class UsersServiceTest {

    @Mock
    private UserReposiotory userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsersService usersService;

    @Test
    public void testGetUsers() {
        List<User> sampleUsers = Arrays.asList(
                new User("user1","user1", "password1"),
                new User("user2","user1" ,"password2")
        );
        when(userRepository.findAll()).thenReturn(sampleUsers);
        List<User> returnedUsers = usersService.getUsers();
        assertEquals(sampleUsers, returnedUsers);
    }
}
