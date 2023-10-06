package com.example.BlogApp;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
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
    @Test
    public void testCreateUser_FirstUser() {
        User user = new User();
        user.setUserName("testUser");
        user.setPassword("testPassword");

        when(userRepository.count()).thenReturn(0L);
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);
        User createdUser = usersService.createUser(user);
        assertEquals(UserRole.ROLE_ADMIN, createdUser.getRoles().iterator().next());
        assertEquals("encodedPassword", createdUser.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testCreateUser_NonFirstUser() {
        User user = new User();
        user.setUserName("testUser");
        user.setPassword("testPassword");

        when(userRepository.count()).thenReturn(1L);
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);
        User createdUser = usersService.createUser(user);
        assertEquals(UserRole.ROLE_USER, createdUser.getRoles().iterator().next());
        assertEquals("encodedPassword", createdUser.getPassword());
        verify(userRepository, times(1)).save(user);
    }
     @Test
    public void testExistsByUsername_UserExists() {
        String username = "testUser";
        when(userRepository.existsByUsername(username)).thenReturn(true);
        boolean result = usersService.existsByUsername(username);
        assertTrue(result);
        verify(userRepository, times(1)).existsByUsername(username);
    }

    @Test
    public void testExistsByUsername_UserDoesNotExist() {
        String username = "testUser";
        when(userRepository.existsByUsername(username)).thenReturn(false);
        boolean result = usersService.existsByUsername(username);
        assertFalse(result);
        verify(userRepository, times(1)).existsByUsername(username);
    }

    @Test
    public void testFindByUserName_UserFound() {
        String username = "testUser";
        User mockUser = new User(); 
        when(userRepository.findByUserName(username)).thenReturn(mockUser);
        User result = usersService.findByUserName(username);
        assertNotNull(result);
        assertEquals(mockUser, result);
        verify(userRepository, times(1)).findByUserName(username);
    }

    @Test
    public void testFindByUserName_UserNotFound() {
        String username = "testUser";
        when(userRepository.findByUserName(username)).thenReturn(null);
        User result = usersService.findByUserName(username);
        assertNull(result);
        verify(userRepository, times(1)).findByUserName(username);
    }
    @Test
    public void testCreateUser_PasswordEmpty() {
    User user = new User();
    user.setPassword("");
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
        usersService.createUser(user);
    });
    assertEquals("Password cannot be empty", exception.getMessage());
}
@Test
public void testCreateUser_PasswordNull() {
    User user = new User();
    user.setPassword(null);
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
        usersService.createUser(user);
    });

    assertEquals("Password cannot be empty", exception.getMessage());
}



}

