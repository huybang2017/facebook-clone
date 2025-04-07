package com.facebook.server.dto.request;

import java.time.LocalDateTime;

import com.facebook.server.entity.Image;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String name;
    private LocalDateTime birthday;
    private String linkSocialMedia;
    private String bio;
    private Image image;
}
