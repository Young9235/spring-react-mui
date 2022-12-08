package com.example.Server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor	// 모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor	// 파라미터가 없는 기본 생성자를 생성
@Data		// getter, setter 만들어줌
public class Attach {
	
    private String attachId;
	
    private String externalId;	
    
    private String tableType;	
    
    private String orgFileNm;	
    
    private String saveFilePath;	
    
    private String saveFileNm;	
    
    private String fileType;
    
    private String fileSize;
    
    private String ext;
    
    private String createId;
    
    private String createDate;
    
    // 파일다운로드 URL
    private String downloadUrl;
}
