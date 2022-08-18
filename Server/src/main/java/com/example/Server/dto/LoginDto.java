package com.example.Server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * 외부와의 통신을 위한 DTO
 */
@AllArgsConstructor
@NoArgsConstructor	
@Data
public class LoginDto {

   private String username;
   private String password;
}
