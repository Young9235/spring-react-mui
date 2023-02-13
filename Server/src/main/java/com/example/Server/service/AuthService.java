package com.example.Server.service;

import java.util.HashMap;
import java.util.List;

import com.example.Server.model.Auth;
import com.example.Server.model.Book;

public interface AuthService {

	public List<Auth> getAuthList(HashMap<String, Object> map) throws Exception;
}
