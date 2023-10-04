package com.example.blogappsql.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.blogappsql.Entity.Blog;

public interface BlogPostRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByAuthor(String username);

	List<Blog> findByUserName(String username);

	List<Blog> findByuserName(String username);
}
