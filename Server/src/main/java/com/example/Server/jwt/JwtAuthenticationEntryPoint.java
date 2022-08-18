package com.example.Server.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

   @Override
   public void commence(HttpServletRequest request,
                        HttpServletResponse response,
                        AuthenticationException authException) throws IOException {
	   
	   int exception = (int)request.getAttribute("exception");
	   //System.out.println("exception =====> " + exception);
	   // 유효한 자격증명을 제공하지 않고 접근하려 할때 401(id,pw 일치하지 않을 때 response함), 토큰 만료시 402 error
	   response.sendError(exception);
   }
   
   //한글 출력을 위해 getWriter() 사용
//   private void setResponse(HttpServletResponse response, String code) throws IOException {
//       response.setContentType("application/json;charset=UTF-8");
//       response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//       JSONObject responseJson = new JSONObject();
//       responseJson.put("message", code);
//       responseJson.put("code", code.getCode());
//
//       response.print(responseJson);
//   }
}
