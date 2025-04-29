package com.facebook.server.dto.response;

import com.facebook.server.entity.User;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FriendResponse {
    private String id;
    private User user;
    private User suggestedFriend;
    private String reason;
    private LocalDateTime createdAt;
}
