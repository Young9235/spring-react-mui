package com.example.Server.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONArray;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor	
@Data		
public class UserVo {
	
    private Long userId;
    private String nickname;
    private String username;
    private String password;
    private String snsLoginType;
    private String roles;
    private String updateDate;
    private String refreshToken;
    private String status;
    private String company;
   
    
    // ENUM으로 안하고 ,로 해서 구분해서 ROLE을 입력 -> 그걸 파싱!!
    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
}
