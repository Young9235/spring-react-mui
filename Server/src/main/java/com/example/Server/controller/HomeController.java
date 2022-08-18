package com.example.Server.controller;


import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Server.dto.TokenDto;
import com.example.Server.jwt.JwtFilter;
import com.example.Server.model.UserVo;
import com.example.Server.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
	private final UserService userService;
	
	@GetMapping("/hello")
	public ResponseEntity<String> getUserList() throws Exception {	
		return ResponseEntity.ok("hello");
	}
	
	// JWT 토큰에서 인증 정보 조회
 	@GetMapping("/userInfo")
    public ResponseEntity<UserVo> getAuthentication(HttpServletRequest request) throws Exception {
 		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
 		String username = authentication.getName();
 		UserVo user = userService.findByUsername(username);
 		
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
 	
 	@GetMapping("/logout")
    public ResponseEntity<TokenDto> logout(HttpServletRequest request) throws Exception {
        String jwt = "invalid_token";
        
        userService.updateRefreshToken(null);
        
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        
 		return new ResponseEntity<>(new TokenDto(jwt, null), httpHeaders, HttpStatus.OK);
    }
}
