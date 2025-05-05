package com.facebook.server.dto.model;

import com.facebook.server.entity.constants.NotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationModel {

    private Long notificationId;
    private String message;
    private boolean isRead;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    private NotificationType notificationType;
    private Long receiverId;
    private UserDataModel sender;
    private Long postId;
    private String content;
}
