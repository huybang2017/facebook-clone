package com.facebook.server.service.impl;

import com.facebook.server.dto.request.ToxicPostRequest;
import com.facebook.server.dto.response.ToxicPostResponse;
import com.facebook.server.entity.AiModerationToxicPostLog;
import com.facebook.server.entity.Post;
import com.facebook.server.repository.AiModerationToxicPostLogRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.service.AiModerationPostService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiModerationPostServiceImpl implements AiModerationPostService {

  private final AiModerationToxicPostLogRepository logRepository;
  private final PostRepository postRepository;

  private final WebClient webClient = WebClient.builder()
      .baseUrl("http://127.0.0.1:8000")
      .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
      .build();

  @Override
  public ToxicPostResponse moderate(ToxicPostRequest request) {
    Post post = postRepository.findById(request.getPostId())
        .orElseThrow(() -> new RuntimeException("Post not found"));

    // Gửi request đến FastAPI
    ToxicPostResponse response = webClient.post()
        .uri("/predict")
        .bodyValue(Map.of("text", post.getContent()))
        .retrieve()
        .bodyToMono(ToxicPostResponse.class)
        .block();

    // Lưu log vào database
    AiModerationToxicPostLog log = new AiModerationToxicPostLog();
    log.setId(UUID.randomUUID().toString());
    log.setPost(post);
    log.setCreatedAt(LocalDateTime.now());
    logRepository.save(log);

    return response;
  }
}
