package com.facebook.server.controller;

import com.facebook.server.dto.response.PhotoListResponse;
import com.facebook.server.service.PostImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostImageController {

  private final PostImageService postImageService;

  @PostMapping("/image/upload")
  public void uploadPostImages(@RequestParam(value = "postId") Long postId,
      @RequestParam(value = "file") MultipartFile[] files) {
    postImageService.uploadPostImages(postId, files);
  }

  @GetMapping("/image/{userId}")
  public PhotoListResponse fetchAllPhotos(@PathVariable("userId") Long userId,
      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
      @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
    return postImageService.fetchAllPhotos(userId, pageNo, pageSize);
  }

}
