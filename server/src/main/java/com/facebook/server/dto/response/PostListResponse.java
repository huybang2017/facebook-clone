package com.facebook.server.dto.response;

import com.facebook.server.dto.model.PostModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostListResponse {
  private List<PostModel> postList;
  private PageResponse pageResponse;
}
