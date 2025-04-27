package com.facebook.server.entity.dto.request;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
