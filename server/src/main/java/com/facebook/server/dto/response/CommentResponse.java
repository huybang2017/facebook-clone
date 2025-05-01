package com.facebook.server.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

import com.facebook.server.entity.Post;
import com.facebook.server.entity.User;

@Data
public class CommentResponse {
    private String id;
    private String description;
    private User user;
    private Post post;
    private LocalDateTime createdAt;
}
