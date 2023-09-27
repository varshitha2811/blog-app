package com.example.blogappsql.Repository;

import org.springframework.data.repository.CrudRepository;

import com.example.blogappsql.Entity.User;

public interface UserReposiotory extends CrudRepository<User, String>{
	public User findByUserName(String UserName);
//	boolean existsByUsername(String UserName);

    }
