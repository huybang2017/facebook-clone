package com.instagram.server.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.instagram.server.utils.Enum.StatusPost;
import com.instagram.server.utils.Enum.StatusShow;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String caption;
    
    @Enumerated(EnumType.STRING)
    private StatusPost statusPost;
    
    @Enumerated(EnumType.STRING)
    private StatusShow statusShow;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}