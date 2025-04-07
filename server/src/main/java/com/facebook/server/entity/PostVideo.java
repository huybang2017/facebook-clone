package com.facebook.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_video")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String video;

    @ManyToOne
    @JoinColumn(name = "thumbnail_id")
    private Image thumbnail;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String title;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "post_id")
    private String postId;
}
