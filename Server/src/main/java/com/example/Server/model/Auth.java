package com.example.Server.model;

import java.util.ArrayList;

import com.example.Server.dto.AttachDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor	// 모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor	// 파라미터가 없는 기본 생성자를 생성
@Data		// getter, setter 만들어줌
public class Auth {
	/*
		authId varchar(20) PK 
        authNm varchar(100) 
        authDesc varchar(500) 
        useYn varchar(1) 
        createId int(11) 
        createDate varchar(25) 
        updateId int(11) 
        updateDate varchar(25)
	*/
	
    private String authId;
	
    private String authNm;	// 제품코드
    
    private String authDesc;	// 제목
    
    private String useYn;	// 글쓴이
    
    private int createId;	//내용
    
    private String createDate;	// 카테고리
    
    private int updateId;
    
    private String updateDate;

}
