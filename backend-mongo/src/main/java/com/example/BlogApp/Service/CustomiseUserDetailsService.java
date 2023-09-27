//package com.example.BlogApp.Service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import com.example.BlogApp.Entity.User;
//import com.example.BlogApp.repo.UserReposiotory;
//
//public class CustomiseUserDetailsService implements UserDetailsService{
//	@Autowired
//	private UserReposiotory usersRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = usersRepository.findByUserName(username);
//		if (user == null) {
//			throw new UsernameNotFoundException("User not found with UserName: " + username);
//		}
//		return user;
//	}
//}

package com.example.BlogApp.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.BlogApp.Entity.User;
import com.example.BlogApp.repo.UserReposiotory;

@Service
public class CustomiseUserDetailsService implements UserDetailsService {

	@Autowired
	private UserReposiotory userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUserName(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return user;
	}
}
