package com.example.BlogApp.Entity;

import org.springframework.data.annotation.Id;

public class Comment {
	@Id
    private String id;
	private String name;
    private String comment;
    
    public Comment() {
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Comment(String name, String comment) {
        this.name = name;
        this.comment = comment;
    }
}
