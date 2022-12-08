package com.example.Server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * 업로드된 파일 정보
 */

@AllArgsConstructor	
@NoArgsConstructor	
@Data		
public class AttachDto {
	
	private String id;
	
    private String name;
    
    private String previewUrl;	// 파일다운로드 URL
    
    private String type;	
    
    private String uploadedDate;	
    
    private String lastModifiedDate;	
    
    private String size;	
    
    private String width;
    
    private String height;
}
