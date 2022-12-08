package com.example.Server.model;

import java.util.ArrayList;

import com.example.Server.dto.AttachDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor	// 모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor	// 파라미터가 없는 기본 생성자를 생성
@Data		// getter, setter 만들어줌
public class Book {
	/*
		bookId varchar(20) PK 
        productCode varchar(45) 
        title varchar(45) 
        author varchar(20) 
        publicDate varchar(45) 
        description varchar(300) 
        inStockYn varchar(45) 
        inStockCnt varchar(45) 
        category varchar(45) 
        price varchar(10) 
        tagId varchar(45)
	*/
	
    private String bookId;
	
    private String productCode;	// 제품코드
    
    private String title;	// 제목
    
    private String author;	// 글쓴이
    
    private String description;	//내용
    
    private String category;	// 카테고리
    
    private String price;
    
    private ArrayList<AttachDto> fileData;

}
