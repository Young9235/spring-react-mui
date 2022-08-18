package com.example.Server.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

	private SecurityUtil() {
		
	}

	// security context에 username을 리턴해주는 메소드
	public static String getCurrentUsername() {
		// jwtFilter의 doFilter메소드에서 Request가 들어올 때 저장된 jwt를 Authentication객체로 저장해서 사용하게 된다.
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();	

		if (authentication == null) {
			logger.debug("Security Context에 인증 정보가 없습니다.");
			return null;
		}

		String username = null;
		if (authentication.getPrincipal() instanceof UserDetails) {
			UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
			username = springSecurityUser.getUsername();
		} else if (authentication.getPrincipal() instanceof String) {
			username = (String) authentication.getPrincipal();
		}
		
		return username;
   }
}
