package com.example.blogappsql.Repository;
import org.springframework.data.repository.CrudRepository;

import com.example.blogappsql.Entity.Blog;

public interface BlogPostRepository extends CrudRepository<Blog, Long> {
}
