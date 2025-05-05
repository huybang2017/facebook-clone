package com.facebook.server.service;

import com.facebook.server.dto.request.ToxicPostRequest;
import com.facebook.server.dto.response.ToxicPostResponse;

public interface AiModerationPostService {
  ToxicPostResponse moderate(ToxicPostRequest request);
}
