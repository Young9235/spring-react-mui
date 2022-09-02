package com.example.Server.service;

import java.util.HashMap;
import java.util.List;

import com.example.Server.model.UserVo;

public interface UserService {

	public List<UserVo> getUserList(HashMap<String, Object> map) throws Exception;
	
	public int insertUser(HashMap<String, Object> map) throws Exception;
	
	public int updateUser(HashMap<String, Object> map) throws Exception;
	
	public int deleteUser(HashMap<String, Object> map) throws Exception;
	
	public UserVo getUserInfo(HashMap<String, Object> map) throws Exception;
	
	public UserVo getUserRenew(String refreshToken);
	
	public UserVo signup(UserVo userDto) throws Exception;
	
	public UserVo findByUsername(String username);

	public int updateRefreshToken(HashMap<String, Object> map) throws Exception;
	
	public int getUserListCnt(HashMap<String, Object> map) throws Exception;
}
