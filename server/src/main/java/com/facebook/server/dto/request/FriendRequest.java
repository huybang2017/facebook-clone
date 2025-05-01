package com.facebook.server.dto.request;

import lombok.Data;

@Data
public class FriendRequest {
    private String userId;
    private String suggestedFriendId;
    private String reason;
}
