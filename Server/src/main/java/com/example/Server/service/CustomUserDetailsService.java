package com.example.Server.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Server.dao.UserMapper;
import com.example.Server.model.UserVo;

import java.util.List;
import java.util.stream.Collectors;
/*
 * UserDetailsService 임플리먼츠, userMapper을 주입받아 loadUserByUsername함수에서 사용 
 * => 유저정보 DB에서 가져와 유저가 존재하는지 않하는지 체크하여 유저객체를 리턴한다.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
   
	private final UserService userService;

	public CustomUserDetailsService(UserService userService) {
		this.userService = userService;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(final String username) {
		UserVo user = userService.findByUsername(username);
		if(user == null) {
			  new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다.");
		}
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));	
		//System.out.println("username ==> " + user.getUsername() + " userPw ==> " + user.getPassword());
			  
		List<GrantedAuthority> grantedAuthorities = user.getRoleList().stream()
		          .map(authority -> new SimpleGrantedAuthority(user.getRoles()))
		          .collect(Collectors.toList());
		   
		return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
	}
}
