package com.example.Server.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.Server.model.Auth;
import com.example.Server.model.Book;

@Mapper	
public interface AuthMapper {
	List<Auth> getAuthList(HashMap<String, Object> map) throws Exception;
}
