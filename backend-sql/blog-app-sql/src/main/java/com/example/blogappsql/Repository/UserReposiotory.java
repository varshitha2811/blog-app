package com.example.blogappsql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.blogappsql.Entity.User;

public interface UserReposiotory extends JpaRepository<User, String>{
	public User findByUserName(String UserName);
    boolean existsByUsername(String UserName);

    }
