package com.facebook.server.dto.response;

import java.time.LocalDateTime;

import com.facebook.server.entity.Post;
import com.facebook.server.entity.User;

import lombok.Data;

@Data
public class LikeResponse {
    private String id;
    private Boolean icon;
    private User user;
    private Post post;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}