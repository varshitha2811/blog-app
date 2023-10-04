package com.example.blogappsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.blogappsql.Entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
	UserProfile findByUserName(String userName);
}