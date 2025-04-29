package com.facebook.server.dto.request;

import lombok.Data;

@Data
public class LikeRequest {
    private String userId;
    private String postId;
    private Boolean icon;
}
