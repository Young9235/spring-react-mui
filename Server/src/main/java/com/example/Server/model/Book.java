package com.example.Server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor	// 모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor	// 파라미터가 없는 기본 생성자를 생성
@Data		// getter, setter 만들어줌
public class Book {
//	idx int AI PK 
//	productCode varchar(45) 
//	title varchar(45) 
//	author varchar(20) 
//	publicDate varchar(45) 
//	description varchar(300) 
//	inStockYn varchar(45) 
//	inStockCnt varchar(45) 
//	category varchar(45) 
//	price varchar(10) 
//	salePrice varchar(45)
	
    private Long idx;
	
    private String title;
    
    private String author;
    
    private String description;
    
    private String category;
    
    private String price;

}
