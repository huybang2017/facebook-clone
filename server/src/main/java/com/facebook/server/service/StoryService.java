package com.facebook.server.service;

import com.facebook.server.dto.response.StoryListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StoryService {

    void createStory(String text, MultipartFile file);

    List<StoryListResponse> fetchAllStories();

    void deleteStory(Long storyId);
}
