package com.facebook.server.service.impl;

import com.facebook.server.dto.model.NotificationModel;
import com.facebook.server.dto.response.CountResponse;
import com.facebook.server.dto.response.NotificationResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.entity.Notification;
import com.facebook.server.entity.constants.NotificationType;
import com.facebook.server.repository.NotificationRepository;
import com.facebook.server.service.NotificationService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.StringUtil;
import com.facebook.server.utils.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final SimpMessagingTemplate messagingTemplate;
    private final Pagination pagination;

    @Override
    public NotificationResponse fetchAllNotifications(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        Page<Notification> notifications = notificationRepository.findAllByReceiver_UserId(userId, pageable);
        PageResponse pageResponse = pagination.getPagination(notifications);

        List<NotificationModel> notificationModels = new ArrayList<>();

        for (Notification notification : notifications) {
            NotificationModel model = notificationMapper.mapEntityToModel(notification);
            if (notification.getNotificationType().equals(NotificationType.POST_LIKED)) {
                model.setContent(notification.getPost().getContent());
            }
            notificationModels.add(model);
        }

        return new NotificationResponse(notificationModels, pageResponse);
    }

    @Override
    public void markAsRead(Long notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);

        notification.ifPresent(value -> value.setRead(true));
    }

    @Override
    public CountResponse getNotificationCount(Long userId) {
        Long count = notificationRepository.countNotification(userId);
        CountResponse countResponse = new CountResponse();
        countResponse.setCount(count);
        return countResponse;
    }

    @Override
    public void sendNotification(String email, NotificationModel notificationModel) {
        log.info("sending WS notification to {} with payload {}", email, notificationModel);
        try {
            messagingTemplate.convertAndSendToUser(email, "/notifications", notificationModel);
        } catch (Exception e) {
            log.error("Error sending notification: {}", e.getMessage(), e);
        }
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
