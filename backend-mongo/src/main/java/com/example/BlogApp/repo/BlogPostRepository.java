package com.example.BlogApp.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.BlogApp.Entity.Blog;

public interface BlogPostRepository extends MongoRepository<Blog, String> {

	List<Blog> findByAuthor(String username);

	List<Blog> findByUserName(String username);

	List<Blog> findByuserName(String username);
}
