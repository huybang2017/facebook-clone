package com.facebook.server.dto.response;

import com.facebook.server.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private UserResponse user;
    private String accessToken;
    private String refreshToken;
}
