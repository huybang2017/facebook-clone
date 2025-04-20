package com.facebook.server.dto.response;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.facebook.server.entity.Post;
import com.facebook.server.entity.Image;
import com.facebook.server.entity.Video;
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
    private List<String> images; // Danh sách các URL hoặc thông tin ảnh
    private List<String> videos; // Danh sách các URL hoặc thông tin video

    public static PostResponse fromEntity(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setCaption(post.getCaption());
        response.setStatusPost(post.getStatusPost());
        response.setStatusShow(post.getStatusShow());
        response.setUserId(post.getUser().getId());
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());

        response.setImages(post.getImages().stream()
                .map(Image::getImage)
                .collect(Collectors.toList()));

        response.setVideos(post.getVideos().stream()
                .map(Video::getVideo)
                .collect(Collectors.toList()));

        return response;
    }
}
