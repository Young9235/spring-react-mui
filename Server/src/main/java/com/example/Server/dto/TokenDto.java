package com.example.Server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor	
@Data
public class TokenDto {

    private String accessToken;
    private String refreshToken;
}
