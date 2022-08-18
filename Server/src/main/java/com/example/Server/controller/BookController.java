package com.example.Server.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Server.model.Book;
import com.example.Server.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController	// requestMapping으로 설정해주지 않아도 됨
@RequiredArgsConstructor	// 생성자 주입(lombok) => 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
@RequestMapping("/book")
public class BookController {
	
	private final BookService bookService;
	
	// security 라이브러리(CORS정책) => 필터를 만들어야함 => 시큐리티가 CORS를 해제해줘야함
	
	// 모두 가져오기
	@GetMapping("/list")	
	public ResponseEntity<?> getBookList() throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		return new ResponseEntity<>(bookService.getBookList(map), HttpStatus.OK);	// Book데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}
	
	// 저장하기
	@PostMapping("/")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> insertBook(@RequestBody /* Json으로 받음 */ Book book) throws Exception {
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("title", book.getTitle());
		map.put("description", book.getDescription());
		map.put("price", book.getPrice());
		
		return new ResponseEntity<>(bookService.insertBook(map), HttpStatus.CREATED);
	}
	
	// 한건 가져오기
	@GetMapping("/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> getBookInfo(@PathVariable Long id) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		return new ResponseEntity<>(bookService.getBookInfo(map), HttpStatus.OK);
	}
	
	// 수정하기
	@PutMapping("/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book book) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		map.put("title", book.getTitle());
		map.put("description", book.getDescription());
		map.put("price", book.getPrice());
		
		return new ResponseEntity<>(bookService.updateBook(map), HttpStatus.OK);
	}
	
	// 삭제하기
	@DeleteMapping("/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> deleteBook(@PathVariable /* url에서 각 구분자에 들어오는 값을 처리해야 할 때 사용 */ Long id, 
			@RequestBody Book book) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == null) {
			throw new IllegalArgumentException("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		return new ResponseEntity<>(bookService.deleteBook(map), HttpStatus.OK);
	}
}
