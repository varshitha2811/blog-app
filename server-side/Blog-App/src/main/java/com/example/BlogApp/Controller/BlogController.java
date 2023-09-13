package com.example.BlogApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.repo.BlogPostRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/home")
@RequestMapping("/blogs")
public class BlogController implements WebMvcConfigurer {
	
	private final BlogPostRepository blogPostRepository;
	@Autowired
	public BlogController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
	
	@GetMapping("/home")
	public List<Blog> getAllBlogPost(){
		return blogPostRepository.findAll();
	}

}
	
	
