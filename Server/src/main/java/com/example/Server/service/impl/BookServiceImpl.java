package com.example.Server.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Server.dao.BookMapper;
import com.example.Server.model.Book;
import com.example.Server.service.BookService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
	
	private final BookMapper bookMapper;
	
	@Transactional(readOnly = true)	
	public int getBookListCnt(HashMap<String, Object> map) throws Exception {
		return bookMapper.getBookListCnt(map);
	}
	
	@Transactional(readOnly = true)		
	public List<Book> getBookList(HashMap<String, Object> map) throws Exception {
		return bookMapper.getBookList(map);
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteBook(HashMap<String, Object> map) throws Exception {
		int suc = bookMapper.deleteBook(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public Book getBookInfo(HashMap<String, Object> map) throws Exception {
		return bookMapper.getBookInfo(map);
	}
	
	@Transactional
	public int insertBook(HashMap<String, Object> map) throws Exception {
		int suc = bookMapper.insertBook(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public int updateBook(HashMap<String, Object> map) throws Exception {
		int suc = bookMapper.updateBook(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
//	@Override
//	public List<Book> insertBook() throws Exception {
//		if(boardMapper.save(boardDto) == 0){
//			throw new IllegalArgumentException("데이터베이스에 저장되지 않았습니다.");
//	   	}
//		
//		return bookMapper.getBookList();
//	}
	
}
