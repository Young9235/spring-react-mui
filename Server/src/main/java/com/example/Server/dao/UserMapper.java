package com.example.Server.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.Server.model.UserVo;

@Mapper	// @Repository안에 존재 포함하고 있음, 작은단위 @MapperScan 필히 사용해야함 -> 어느것을 사용해도 상관없..지만 부트에서는 Mapper을 주로 쓰는듯보인다...
public interface UserMapper {
	List<UserVo> getUserList(HashMap<String, Object> map) throws Exception;
	
	int deleteUser(HashMap<String, Object> map) throws Exception;
	
	int updateUser(HashMap<String, Object> map) throws Exception;
	
	int insertUser(HashMap<String, Object> map) throws Exception;
	
	int insertAuth(HashMap<String, Object> map) throws Exception;
	
	UserVo getUserInfo(HashMap<String, Object> map) throws Exception;
	
	UserVo findByUsername(String username);

	int updateRefreshToken(HashMap<String, Object> map) throws Exception;

	UserVo getUserRenew(String refreshToken);
}
