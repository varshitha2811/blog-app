package com.example.BlogApp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.BlogApp.Entity.UserProfile;

public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
	UserProfile findByUserName(String userName);
}