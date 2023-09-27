package com.example.BlogApp.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.BlogApp.Entity.Blog;
import com.example.BlogApp.Entity.Comment;
import com.example.BlogApp.repo.BlogPostRepository;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "http://localhost:5000")
@EnableWebMvc
public class BlogController implements WebMvcConfigurer {
	private final BlogPostRepository blogPostRepository;

	@Autowired
	public BlogController(BlogPostRepository blogPostRepository) {
		this.blogPostRepository = blogPostRepository;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:5000")
				.allowedMethods("GET", "POST", "PUT", "DELETE").allowedHeaders("*");
	}

	@GetMapping("/home")
	public List<Blog> getAllBlogPost() {
		return blogPostRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
		Blog blog = blogPostRepository.findById(id).orElse(null);
		if (blog != null) {
			return ResponseEntity.ok(blog);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/add")
	public Blog addBlog(@RequestBody Blog blog) {
		return blogPostRepository.save(blog);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Blog> updateBlog(@PathVariable String id, @RequestBody Blog updatedBlog) {
		System.out.println("Received request to update blog with ID: " + id);
		Optional<Blog> optionalBlog = blogPostRepository.findById(id);
		return optionalBlog.map(blog -> {
			blog.setTitle(updatedBlog.getTitle());
			blog.setAuthor(updatedBlog.getAuthor());
			blog.setDescription(updatedBlog.getDescription());
			blog.setTags(updatedBlog.getTags());
			blog.setUrl(updatedBlog.getUrl());
			blog.setTime(updatedBlog.getTime());
			Blog savedBlog = blogPostRepository.save(blog);
			return ResponseEntity.ok(savedBlog);
		}).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBlog(@PathVariable("id") String id) {
		try {
			blogPostRepository.deleteById(id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting blog post.");
		}
	}

	@PostMapping("/add-comment/{blogId}")
	public ResponseEntity<?> addComment(@PathVariable String blogId, @RequestBody Comment comment) {
		try {
			Optional<Blog> optionalBlog = blogPostRepository.findById(blogId);
			if (optionalBlog.isPresent()) {
				Blog blog = optionalBlog.get();
				if (blog.getComments() == null) {
					blog.setComments(new ArrayList<>());
				}
				blog.getComments().add(comment);
				Blog updated = blogPostRepository.save(blog);
				return ResponseEntity.ok(updated);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment.");
		}
	}

	@DeleteMapping("/delete-comment/{blogId}/{commentIndex}")
	public ResponseEntity<?> deleteComment(@PathVariable String blogId, @PathVariable int commentIndex) {
		try {
			Optional<Blog> optionalBlog = blogPostRepository.findById(blogId);
			if (optionalBlog.isPresent()) {
				Blog blog = optionalBlog.get();
				List<Comment> comments = blog.getComments();
				if (commentIndex >= 0 && commentIndex < comments.size()) {
					comments.remove(commentIndex);
					blogPostRepository.save(blog);
					return ResponseEntity.ok(blog);
				} else {
					return ResponseEntity.badRequest().body("Invalid comment index.");
				}
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting comment.");
		}
	}
	@GetMapping("/search/{searchTerm}")
    public List<Blog> searchBlogs(@PathVariable String searchTerm) {
        List<Blog> matchingBlogs = new ArrayList<>();
        List<Blog> allBlogs = blogPostRepository.findAll();
        for (Blog blog : allBlogs) {
            boolean matches = false;
            String lowercaseSearchTerm = searchTerm.toLowerCase();
            String lowercaseAuthor = blog.getAuthor().toLowerCase();
            String lowercaseTitle = blog.getTitle().toLowerCase();
            List<String> lowercaseTags = blog.getTags().stream()
                    .map(String::toLowerCase)
                    .collect(Collectors.toList());
            if (lowercaseAuthor.contains(lowercaseSearchTerm)
                    || lowercaseTitle.contains(lowercaseSearchTerm)
                    || lowercaseTags.contains(lowercaseSearchTerm)) {
                matches = true;
            }
            if (matches) {
                matchingBlogs.add(blog);
            }
        }
        return matchingBlogs;
    }
}