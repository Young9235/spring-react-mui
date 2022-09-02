package com.example.Server.service.impl;

import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Server.dao.SeqMapper;
import com.example.Server.dao.UserMapper;
import com.example.Server.exception.DuplicateMemberException;
import com.example.Server.jwt.TokenProvider;
import com.example.Server.model.UserVo;
import com.example.Server.service.UserService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor	// 자동으로 DI가 이뤄짐
public class UserServiceImpl implements UserService {
	
	private final UserMapper userMapper;
	private final SeqMapper seqMapper;
	
	final String authStr = "AUTH_ID";
	
	@Transactional(readOnly = true)		
	public List<UserVo> getUserList(HashMap<String, Object> map) throws Exception {
		return userMapper.getUserList(map);
	}
	
	@Transactional	// 서비스 함수가 종료될때 commit할지 rollback할지 트랜젝션 관리하겠다.
	public int deleteUser(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.deleteUser(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("USER 데이터베이스에 삭제되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public UserVo getUserInfo(HashMap<String, Object> map) throws Exception {
		UserVo user = userMapper.getUserInfo(map);
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
				
		return user;
	}
	
	@Transactional
	public int insertUser(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.insertUser(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("USER 데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public int updateUser(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.updateUser(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("USER 데이터베이스에 업데이트 되지 않았습니다.");
		return suc;
	}
	
	@Transactional
	public int insertAuth(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.insertAuth(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("AUTH 데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional
    public UserVo signup(UserVo userDto) throws Exception {
		// 저장
		// 조회
		
		UserVo userVo = null;
		HashMap<String, Object> map = new HashMap<>();
		userVo = this.findByUsername(userDto.getUsername());
		if (userVo != null) {
            throw new DuplicateMemberException("중복된 아이디 입니다.");
        }
		
		map.put("username", userDto.getUsername());
		map.put("nickname", userDto.getNickname());
		map.put("password", userDto.getPassword());
		
		this.insertUser(map);
		userVo = this.findByUsername(userDto.getUsername());
		
		map.clear();
		String seq = seqMapper.getSequenceInfo(authStr);		
		seqMapper.updateSequenceInfo(authStr);
		map.put("authId", seq);
		map.put("userId", userVo.getUserId());
		map.put("authName", "ROLE_USER");
		
		this.insertAuth(map);
		
		return this.findByUsername(userVo.getUsername());
    }
	
	@Transactional(readOnly = true)	
    public UserVo findByUsername(String username) {
		UserVo user = userMapper.findByUsername(username);
		// 암호화된 비밀번호를 리턴해야함.. DB에 암호화된 비번으로 등록이 되있어야함(4일을 해맴...) -> 현재는 암호화하지 않았기때문에 서버에서 암호화함
		//user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));	
		
		return user;
	}

	@Transactional
	public int updateRefreshToken(HashMap<String, Object> map) throws Exception {
		int suc = userMapper.updateRefreshToken(map);
		if(suc <= 0) 
			throw new IllegalArgumentException("USER 데이터베이스에 저장되지 않았습니다.");
		return suc;
	}
	
	@Transactional(readOnly = true)
	public UserVo getUserRenew(String refreshToken) {
		return userMapper.getUserRenew(refreshToken);
	}

	@Transactional(readOnly = true)
	public int getUserListCnt(HashMap<String, Object> map) throws Exception {
		return userMapper.getUserListCnt(map);
	}
	
}
