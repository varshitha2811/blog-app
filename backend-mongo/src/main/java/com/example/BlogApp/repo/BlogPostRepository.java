package com.example.BlogApp.repo;



import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.BlogApp.Entity.Blog;

public interface BlogPostRepository extends MongoRepository<Blog, String> {
}
