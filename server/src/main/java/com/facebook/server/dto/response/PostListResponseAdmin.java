package com.facebook.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostListResponseAdmin {
  private List<PostWithToxicResponse> postWithToxicResponseList;
  private PageResponse pageResponse;
}
