package com.facebook.server.dto.request;

import lombok.Data;

@Data
public class CommentRequest {
    private String description;
    private String userId;
    private String postId;
}
