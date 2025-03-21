package com.instagram.server.dto.response;

import com.instagram.server.entity.Post;
import com.instagram.server.utils.Enum.StatusPost;
import com.instagram.server.utils.Enum.StatusShow;
import lombok.Data;
import java.time.LocalDateTime;

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
