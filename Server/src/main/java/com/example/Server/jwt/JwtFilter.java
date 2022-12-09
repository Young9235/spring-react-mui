package com.example.Server.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
/*
 * JWT 커스텀 필터 => 설정한 key값에 대한 유효성 검증과 그것을 SecurityContext에 저장(set)하기 위함
 */
public class JwtFilter extends OncePerRequestFilter {

   private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

   public static final String AUTHORIZATION_HEADER = "Authorization";
   public static final String REFRESH_TOKEN_HEADER = "Auth-Refresh-Token";
   
   public static final String TOKEN_COOKIE_NAME = "Token";

   private TokenProvider tokenProvider;

   public JwtFilter(TokenProvider tokenProvider) {
      this.tokenProvider = tokenProvider;
   }
   
   //토큰의 인증 정보를 Security Context에 저장하기 위함
   @Override
   public void doFilterInternal(HttpServletRequest servletRequest, HttpServletResponse servletResponse, FilterChain filterChain)
           throws ServletException, IOException {
      
	   logger.debug("Authentication Request for '{}'", servletRequest.getRequestURL());
	   HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
	   String jwt = resolveToken(httpServletRequest);
	   String refresh_token = getRefreshToken(httpServletRequest);
	   String requestURI = httpServletRequest.getRequestURI();
	   
	   if(tokenProvider.validateToken(refresh_token) != null && !tokenProvider.validateToken(refresh_token).equals("forbidden") 
			   && tokenProvider.validateToken(jwt) != null) {
		   if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt).equals("success")) { // 토큰의 유효성 검증
			   Authentication authentication = tokenProvider.getAuthentication(jwt);
	           SecurityContextHolder.getContext().setAuthentication(authentication);	// 토큰을 Security Context Set해준다.
	           logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
		   } else if(tokenProvider.validateToken(jwt).equals("forbidden")) {
			   httpServletRequest.setAttribute("exception", 308);	// 만료된 토큰 308 -> refreshToken 발급 
		   }
	   } else {
		   httpServletRequest.setAttribute("exception", HttpServletResponse.SC_UNAUTHORIZED);		// 사용할 수 없는 토큰 강제 로그아웃 401
		   logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
	   }

	   filterChain.doFilter(servletRequest, servletResponse);
   }
   
   // 토큰 정보를 꺼내오기 위함
   private String resolveToken(HttpServletRequest request) {
      String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
      if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
         return bearerToken.substring(7);
      }
      return null;
   }
   
   private String getRefreshToken(HttpServletRequest request) {
      String refreshToken = request.getHeader(REFRESH_TOKEN_HEADER);
      if (StringUtils.hasText(refreshToken)) {
         return refreshToken;
      }
      return null;
   }
   
//   private boolean accessTokenVerification(String jwt) {
//	   if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) { // 토큰의 유효성 검증
//		   Authentication authentication = tokenProvider.getAuthentication(jwt);
//           SecurityContextHolder.getContext().setAuthentication(authentication);	// 토큰을 Security Context Set해준다.
//           logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
//	   }
//   }
}
