package com.facebook.server.dto.request;

import java.util.Date;

import com.facebook.server.utils.Enum.GenderEnum;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
    private String name;
    private GenderEnum gender;
    private Date birthday;
}
