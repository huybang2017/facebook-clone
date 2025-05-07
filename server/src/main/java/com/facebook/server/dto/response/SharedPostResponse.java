package com.facebook.server.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.facebook.server.dto.model.PostImageModel;
import com.facebook.server.dto.model.UserDataModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class SharedPostResponse {
    private Long postId;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    private Long userId;
    private String firstName;
    private String lastName;
    private String profilePicture;
    List<PostImageModel> postImages = new ArrayList<>();
    private UserDataModel guestPoster;
}
