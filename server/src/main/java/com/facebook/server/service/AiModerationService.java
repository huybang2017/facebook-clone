package com.facebook.server.service;

import com.facebook.server.dto.request.ToxicCommentRequest;
import com.facebook.server.dto.response.ToxicCommentResponse;
import com.facebook.server.entity.AiModerationToxicCommentLog;
import com.facebook.server.entity.PostComment;
import com.facebook.server.repository.AiModerationToxicCommentLogRepository;
import com.facebook.server.repository.PostCommentRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiModerationService {

        private final AiModerationToxicCommentLogRepository logRepository;
        private final PostCommentRepository postcommentRepository;

        private final WebClient webClient = WebClient.builder()
                        .baseUrl("http://127.0.0.1:8000")
                        .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .build();

        public ToxicCommentResponse moderate(ToxicCommentRequest request) {
                PostComment comment = postcommentRepository.findById(request.getCommentId())
                                .orElseThrow(() -> new RuntimeException("Comment not found"));

                ToxicCommentResponse response = webClient.post()
                                .uri("/predict")
                                .bodyValue(Map.of("text", comment.getComment()))
                                .retrieve()
                                .bodyToMono(ToxicCommentResponse.class)
                                .block();

                // Ghi log kết quả
                AiModerationToxicCommentLog log = new AiModerationToxicCommentLog();
                log.setId(UUID.randomUUID().toString());
                log.setComment(comment);
                log.setCreatedAt(LocalDateTime.now());
                logRepository.save(log);

                return response;
        }
}
