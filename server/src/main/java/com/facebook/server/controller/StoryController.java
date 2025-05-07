package com.facebook.server.controller;

import com.facebook.server.dto.response.StoryListResponse;
import com.facebook.server.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/story")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @PostMapping("/create")
    public void createStory(@RequestPart(value = "text", required = false) String text,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        storyService.createStory(text, file);
    }

    @GetMapping()
    public List<StoryListResponse> fetchAllStories() {
        return storyService.fetchAllStories();
    }

    @DeleteMapping("/delete/{storyId}")
    public void deleteStory(@PathVariable("storyId") Long storyId) {
        storyService.deleteStory(storyId);
    }
}
