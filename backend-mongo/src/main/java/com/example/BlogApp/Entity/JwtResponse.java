package com.example.BlogApp.Entity;

import java.util.Objects;

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

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		JwtResponse that = (JwtResponse) o;
		return Objects.equals(jwttoken, that.jwttoken) &&
				Objects.equals(username, that.username);
	}

	@Override
	public int hashCode() {
		return Objects.hash(jwttoken, username);
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
