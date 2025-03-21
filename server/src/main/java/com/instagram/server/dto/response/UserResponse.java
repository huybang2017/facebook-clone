package com.instagram.server.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String email;
    private String name;
    private LocalDateTime birthday;
    private String linkSocialMedia;
    private String bio;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
