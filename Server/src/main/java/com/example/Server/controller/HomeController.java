package com.example.Server.controller;


import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Server.dto.TokenDto;
import com.example.Server.jwt.JwtFilter;
import com.example.Server.model.Book;
import com.example.Server.model.SearchParams;
import com.example.Server.service.BookService;
import com.example.Server.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
	private final BookService bookService;
	private final UserService userService;
	
	@GetMapping("/hello")
	public ResponseEntity<String> test() throws Exception {	
		return ResponseEntity.ok("hello");
	}
	
	@GetMapping("/list")   
    //@PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_ADMIN')") // admin과 manager만 권한 허용
    public ResponseEntity<List<Book>> getUserList(SearchParams search) throws Exception {    //ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
        HashMap<String, Object> map = new HashMap<>();
        
        List<Book> bookList = bookService.getBookList(map);
        
        return new ResponseEntity<>(bookList, HttpStatus.OK);   // user데이터와 HttpStatus상태 코드도 같이 리턴한다.
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
