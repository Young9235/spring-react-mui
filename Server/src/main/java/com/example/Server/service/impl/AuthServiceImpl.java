package com.example.Server.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Server.dao.BookMapper;
import com.example.Server.dao.SeqMapper;
import com.example.Server.model.Auth;
import com.example.Server.model.Book;
import com.example.Server.service.AuthService;
import com.example.Server.service.BookService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final BookMapper bookMapper;
	private final SeqMapper seqMapper;
	private final String seqId = "BOOK_ID";
	
	@Override
	public List<Auth> getAuthList(HashMap<String, Object> map) throws Exception {
	    return null;
	}
	
}
