package com.facebook.server.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FriendshipStatusResponse {
    private String status;
    private Long userId;
    private Long friendId;
    private String message;

    public FriendshipStatusResponse(String message, Long userId, Long friendId, String status) {
        this.message = message;
        this.userId = userId;
        this.friendId = friendId;
        this.status = status;
    }

}
