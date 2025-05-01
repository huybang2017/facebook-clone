package com.facebook.server.dto.request;

import lombok.Data;

@Data
public class ShareRequest {
    private String userId;
    private String postId;
}
