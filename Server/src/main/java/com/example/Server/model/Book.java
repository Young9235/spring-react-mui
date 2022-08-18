package com.example.Server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor	// 모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor	// 파라미터가 없는 기본 생성자를 생성
@Data		// getter, setter 만들어줌
public class Book {
//	idx int AI PK 
//	title varchar(45) 
//	description varchar(45) 
//	price varchar(45)
	
    private Long idx;
	
    private String title;
    
    private String description;
    
    private String price;

}
