package com.example.BlogApp.Entity;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.BlogApp.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Document(collection = "UserForm")
public class User implements UserDetails {
	@Id
	
	private String id;
	private String name;
	private String userName;
	private String password;
	@DBRef
	@JsonIgnore
	private UserProfile userprofile;	

	@Field("roles")
    private Set<UserRole> roles;

	private boolean canWriteBlog=true;

	public User(String id, String name, String userName, String password) {
		super();
		this.id = id;
		this.name = name;
		this.userName = userName;
		this.password = password;
	}

	public User(String id, String name, String userName, String password, UserProfile userprofile) {
		super();
		this.id = id;
		this.name=name;
		this.userName = userName;
		this.password = password;
		this.userprofile = userprofile;
	}
	public User() {}
	
	private boolean profileEnabled = true;
    private boolean writeBlogEnabled = true;

    public boolean isProfileEnabled() {
        return profileEnabled;
    }

    public void setProfileEnabled(boolean profileEnabled) {
        this.profileEnabled = profileEnabled;
    }

    public boolean isWriteBlogEnabled() {
        return writeBlogEnabled;
    }

    public void setWriteBlogEnabled(boolean writeBlogEnabled) {
        this.writeBlogEnabled = writeBlogEnabled;
    }
	
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }
	public UserProfile getUserProfile() {
		return userprofile;
	}
	public void setUserProfile(UserProfile userProfile) {
		this.userprofile = userProfile;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public UserProfile getUserprofile() {
		return userprofile;
	}

	public void setUserprofile(UserProfile userprofile) {
		this.userprofile = userprofile;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String username) {
		this.userName = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	// @Override
	// public Collection<? extends GrantedAuthority> getAuthorities() {
	// 	return null;
	// }
	public void setAuthorities(Collection<GrantedAuthority> authorities) {
    }

	@Override
	public String getUsername() {
		return this.userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	public Set<UserRole> getRoles() {
		return roles;
	}
	public void setRoles(Set<UserRole> roles) {
		this.roles = roles;
	}
	public boolean isCanWriteBlog() {
		return canWriteBlog;
	}
	public void setCanWriteBlog(boolean canWriteBlog) {
		this.canWriteBlog = canWriteBlog;
	}
}
