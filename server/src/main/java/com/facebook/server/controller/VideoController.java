package com.facebook.server.controller;

import com.facebook.server.entity.Video;
import com.facebook.server.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload")
    public ResponseEntity<Video> uploadVideo(
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnailFile,
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        try {
            Video savedVideo = videoService.uploadVideoWithThumbnail(
                    videoFile, thumbnailFile, title, description);
            return ResponseEntity.ok(savedVideo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Video>> getAllVideos() {
        List<Video> videos = videoService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) {
        return videoService.getVideoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Video> updateVideo(
            @PathVariable String id,
            @RequestParam(value = "video", required = false) MultipartFile videoFile,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnailFile,
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        try {
            Video updatedVideo = videoService.updateVideo(id, videoFile, thumbnailFile, title, description);
            return ResponseEntity.ok(updatedVideo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable String id) {
        try {
            videoService.deleteVideo(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
