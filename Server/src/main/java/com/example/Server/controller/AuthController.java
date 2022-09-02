package com.example.Server.controller;


import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Server.dto.LoginDto;
import com.example.Server.dto.TokenDto;
import com.example.Server.jwt.JwtFilter;
import com.example.Server.jwt.TokenProvider;
import com.example.Server.model.UserVo;
import com.example.Server.service.UserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    
//    private void addTokenToCookie(HttpServletResponse response, String token) {
//        Cookie tokenCookie = new Cookie(JwtFilter.TOKEN_COOKIE_NAME, token);
//        tokenCookie.setMaxAge(86400);
//        response.addCookie(tokenCookie);
//    }
    
    // 로그인, 유저 토큰 발급
    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@RequestBody LoginDto loginDto) throws Exception {
        
    	UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
    	
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);		// 여기서 loadUserByUsername 호출
        SecurityContextHolder.getContext().setAuthentication(authentication);		// 로그인 상태를 유지 ==> 인가
        
        String access_token = tokenProvider.createToken(authentication);
        String refresh_token = tokenProvider.createRefreshToken();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        //addTokenToCookie(response, jwt);
        HttpHeaders httpHeaders = new HttpHeaders();
        int refResult = 0;
        HashMap<String, Object> map = new HashMap<>();
        if(username != null) {
        	map.put("username", username);
        	map.put("refreshToken", refresh_token);
        	refResult = userService.updateRefreshToken(map);
        }
        
        if(refResult > 0 && access_token != null && refresh_token != null) {
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + access_token);
            httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, refresh_token);
        }
        
        return new ResponseEntity<>(new TokenDto(access_token, refresh_token), httpHeaders, HttpStatus.OK);
    }
    
    @PostMapping("/refreshToken")
    public ResponseEntity<TokenDto> refreshToken(HttpServletRequest request) throws Exception {
        
    	String refreshToken = request.getHeader(JwtFilter.REFRESH_TOKEN_HEADER);
    	
    	logger.info("refresh_token ====> " + refreshToken);
    	UserVo user = userService.getUserRenew(refreshToken);
    	UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
    	
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);		// 여기서 loadUserByUsername 호출
        SecurityContextHolder.getContext().setAuthentication(authentication);		// 로그인 상태를 유지 ==> 인가
        
        String access_token = tokenProvider.createToken(authentication);
        
        HttpHeaders httpHeaders = new HttpHeaders();
        
        if(access_token != null) {
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + access_token);
            httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, refreshToken);
        }
        
        return new ResponseEntity<>(new TokenDto(access_token, refreshToken), httpHeaders, HttpStatus.OK);
    }
    
    // 회원가입
 	@PostMapping("/signup")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
 	public ResponseEntity<UserVo> signup(@RequestBody /* Json으로 받음 */ UserVo userDto) throws Exception {
 		//return ResponseEntity.ok(userService.signup(userDto));
 		return new ResponseEntity<UserVo>(userService.signup(userDto), HttpStatus.CREATED);
 	}
}
