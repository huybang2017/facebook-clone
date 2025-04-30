package com.facebook.server.controller;

import com.facebook.server.entity.dto.request.ToxicPostRequest;
import com.facebook.server.entity.dto.response.ToxicPostResponse;
import com.facebook.server.service.AiModerationPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiModerationPostController {

    private final AiModerationPostService moderationPostService;

    @PostMapping("/moderatePost")
    public ResponseEntity<ToxicPostResponse> moderatePost(@RequestBody ToxicPostRequest request) {
        ToxicPostResponse response = moderationPostService.moderate(request);
        return ResponseEntity.ok(response);
    }
}
