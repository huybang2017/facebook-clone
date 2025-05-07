package com.facebook.server.dto.response;

import com.facebook.server.dto.model.PostModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostWithToxicResponse {
  private PostModel postModel;
  private ToxicPostResponse toxicPostResponse;
}
