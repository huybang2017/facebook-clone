package com.facebook.server.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.facebook.server.utils.Enum.StatusPost;
import com.facebook.server.utils.Enum.StatusShow;

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
  @Column()
  private StatusPost statusPost;

  @Enumerated(EnumType.STRING)
  @Column()
  private StatusShow statusShow;

  @ManyToMany()
  @JoinTable(name = "post_image", joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "image_id", referencedColumnName = "id"))
  private Set<Image> images = new HashSet<>();

  @ManyToMany()
  @JoinTable(name = "post_video", joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "video_id", referencedColumnName = "id"))
  private Set<Video> videos = new HashSet<>();

  @ManyToOne
  @JoinColumn()
  private User user;

  @Column(updatable = false)
  private LocalDateTime createdAt;

  @Column()
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
