package com.facebook.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facebook.server.entity.AiModerationToxicCommentLog;

public interface AiModerationToxicCommentLogRepository extends JpaRepository<AiModerationToxicCommentLog, String> {
}
