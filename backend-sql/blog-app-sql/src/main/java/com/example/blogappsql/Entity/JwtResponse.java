package com.example.blogappsql.Entity;

public class JwtResponse {
	private String jwttoken;
	private String username;

	public JwtResponse() {
		super();
	}

	public JwtResponse(String jwttoken, String user) {
		super();
		this.jwttoken = jwttoken;
		this.username = user;
	}

	public String getJwttoken() {
		return jwttoken;
	}

	public void setJwttoken(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "JwtResponse [jwttoken=" + jwttoken + ", username=" + username + "]";
	}

}

