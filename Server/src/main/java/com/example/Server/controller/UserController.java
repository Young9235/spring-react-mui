package com.example.Server.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Server.model.UserVo;
import com.example.Server.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController	// requestMapping으로 설정해주지 않아도 됨
@RequiredArgsConstructor	// 생성자 주입(lombok) => 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
@RequestMapping("/user")
public class UserController {
	
	private final UserService userService;
	
	// 모두 가져오기
	@GetMapping("/list")	
	//@PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_ADMIN')")	// admin과 manager만 권한 허용
	public ResponseEntity<?> getUserList() throws Exception {	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
		HashMap<String, Object> map = new HashMap<>();
		return new ResponseEntity<>(userService.getUserList(map), HttpStatus.OK);	// user데이터와 HttpStatus상태 코드도 같이 리턴한다.
	}
	
	// 저장하기
	@PostMapping("/save")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> insertUser(@RequestBody /* Json으로 받음 */ UserVo user) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		return new ResponseEntity<>(userService.insertUser(map), HttpStatus.CREATED);
	}
	
	// 한건 가져오기
	@GetMapping("/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	//@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN')")
	public ResponseEntity<?> getUserInfo(@PathVariable Long id) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == null) {
			throw new Exception("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		return new ResponseEntity<>(userService.getUserInfo(map), HttpStatus.OK);
	}
	
	// 수정하기
	@PutMapping("/update/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserVo user) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == null) {
			throw new Exception("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		return new ResponseEntity<>(userService.updateUser(map), HttpStatus.OK);
	}
	
	// 삭제하기
	@DeleteMapping("/delete/{id}")	//ResponseEntity : http status 코드도 같이 리턴 할 수 있다.
	public ResponseEntity<?> deleteUser(@PathVariable Long id, @RequestBody UserVo user) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		
		if(id == null) {
			throw new Exception("param In id not Exits ");
		} else {
			map.put("idx", id);
		}
		
		return new ResponseEntity<>(userService.deleteUser(map), HttpStatus.OK);
	}
}
