package com.facebook.server.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_moderation_toxic_comment_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiModerationToxicCommentLog {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "commment_id")
    private PostComment comment;

    private LocalDateTime createdAt;
}
