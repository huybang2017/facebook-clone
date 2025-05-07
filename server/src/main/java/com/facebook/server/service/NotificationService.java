package com.facebook.server.service;

import com.facebook.server.dto.model.NotificationModel;
import com.facebook.server.dto.response.CountResponse;
import com.facebook.server.dto.response.NotificationResponse;

public interface NotificationService {

    NotificationResponse fetchAllNotifications(Long userId, int pageNo, int pageSize);

    void markAsRead(Long notificationId);

    CountResponse getNotificationCount(Long userId);

    void sendNotification(String email, NotificationModel notificationModel);

    void deleteNotification(Long notificationId);
}
