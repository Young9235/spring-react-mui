package com.example.Server.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.Server.model.Book;

@Mapper	// @Repository안에 존재 포함하고 있음, 작은단위 @MapperScan 필히 사용해야함 -> 어느것을 사용해도 상관없..지만 부트에서는 Mapper을 주로 쓰는듯보인다...
public interface BookMapper {
	List<Book> getBookList(HashMap<String, Object> map) throws Exception;
	
	int deleteBook(HashMap<String, Object> map) throws Exception;
	
	int updateBook(HashMap<String, Object> map) throws Exception;
	
	int insertBook(HashMap<String, Object> map) throws Exception;
	
	Book getBookInfo(HashMap<String, Object> map) throws Exception;

	int getBookListCnt(HashMap<String, Object> map) throws Exception;
}
