package com.example.BlogApp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.BlogApp.Entity.User;

public interface UserReposiotory extends MongoRepository<User, String>{
	public User findByUserName(String userName);
	boolean existsByUsername(String username);

}
