package com.facebook.server.dto.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.facebook.server.dto.response.SharedPostResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_DEFAULT)
public class PostModel {
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
  private SharedPostResponse sharedPost;
  private PostImageModel sharedImage;

}
