package com.example.blogappsql.Repository;
import org.springframework.stereotype.Repository;

import com.example.blogappsql.Entity.User;

@Repository
public interface UserRepository extends org.springframework.data.jpa.repository.JpaRepository<User, Long> {
    User findByUserName(String userName);
    boolean existsByUsername(String userName);
}

