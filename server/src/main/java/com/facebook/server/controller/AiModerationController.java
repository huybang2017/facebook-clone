package com.facebook.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.facebook.server.entity.dto.request.ToxicCommentRequest;
import com.facebook.server.entity.dto.response.ToxicCommentResponse;
import com.facebook.server.service.AiModerationService;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiModerationController {

    private final AiModerationService moderationService;

    @PostMapping("/moderate")
    public ResponseEntity<ToxicCommentResponse> moderate(@RequestBody ToxicCommentRequest request) {
        ToxicCommentResponse response = moderationService.moderate(request);
        return ResponseEntity.ok(response);
    }

}
