package com.facebook.server.entity.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

import com.facebook.server.entity.Post;
import com.facebook.server.utils.Enum.StatusPost;
import com.facebook.server.utils.Enum.StatusShow;

@Data
public class PostResponse {
    private String id;
    private String caption;
    private StatusPost statusPost;
    private StatusShow statusShow;
    private String userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostResponse fromEntity(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setCaption(post.getCaption());
        response.setStatusPost(post.getStatusPost());
        response.setStatusShow(post.getStatusShow());
        response.setUserId(post.getUser().getId());
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());
        return response;
    }
}
