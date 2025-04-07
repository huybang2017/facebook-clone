package com.facebook.server.controller;

import com.facebook.server.entity.PostVideo;
import com.facebook.server.service.PostVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/videos")
public class PostVideoController {

    @Autowired
    private PostVideoService postVideoService;

    @PostMapping("/upload")
    public ResponseEntity<PostVideo> uploadVideo(
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("thumbnail") MultipartFile thumbnailFile,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam String userId,
            @RequestParam String postId) {
        try {
            PostVideo savedVideo = postVideoService.uploadVideoWithThumbnail(
                    videoFile, thumbnailFile, title, description, userId, postId);
            return ResponseEntity.ok(savedVideo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<PostVideo>> getAllVideos() {
        List<PostVideo> videos = postVideoService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostVideo> getVideoById(@PathVariable String id) {
        Optional<PostVideo> postVideo = postVideoService.getVideoById(id);
        return postVideo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostVideo> updateVideo(
            @PathVariable String id,
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("thumbnail") MultipartFile thumbnailFile,
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        try {
            PostVideo updatedVideo = postVideoService.updateVideo(id, videoFile, thumbnailFile, title, description);
            return ResponseEntity.ok(updatedVideo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable String id) {
        try {
            postVideoService.deleteVideo(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
