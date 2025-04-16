package com.facebook.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String id;
    private String accessToken;
    private String refreshToken;
}
