package com.facebook.server.repository;

import com.facebook.server.entity.AiModerationToxicPostLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiModerationToxicPostLogRepository extends JpaRepository<AiModerationToxicPostLog, String> {
}
