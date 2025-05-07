package com.facebook.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.facebook.server.entity.Notification;
import com.facebook.server.entity.constants.NotificationType;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    void deleteByPost_PostIdAndSender_UserId(Long postId, Long userId);

    Page<Notification> findAllByReceiver_UserId(Long userId, Pageable pageable);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.receiver.userId = :userId AND n.isRead IS FALSE")
    Long countNotification(@Param("userId") Long userId);

    void deleteByNotificationTypeAndSender_UserIdAndReceiver_UserId(NotificationType notificationType, Long senderId,
            Long receiverId);

}
