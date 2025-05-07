package com.facebook.server.service;

import com.facebook.server.dto.request.ToxicCommentRequest;
import com.facebook.server.dto.response.ToxicCommentResponse;

public interface AiModerationService {
  ToxicCommentResponse moderate(ToxicCommentRequest request);
}
