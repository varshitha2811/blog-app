package com.example.BlogApp.Service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.repo.UserReposiotory;

@Service
public class UsersService {

	@Autowired
	private UserReposiotory usersRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User createUser(User user) {
		user.setId(UUID.randomUUID().toString());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return usersRepository.save(user);
	}

	public User findByUserName(String UserName) {
		return usersRepository.findByUserName(UserName);
	}

}
