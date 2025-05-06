package com.facebook.server.controller;

import com.facebook.server.dto.request.LikeRequest;
import com.facebook.server.dto.response.LikeResponse;
import com.facebook.server.service.LikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping
    public ResponseEntity<List<LikeResponse>> getAllLikes() {
        return ResponseEntity.ok(likeService.getAllLikes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LikeResponse> getLikeById(@PathVariable String id) {
        return ResponseEntity.ok(likeService.getLikeById(id));
    }

    @PostMapping
    public ResponseEntity<LikeResponse> createLike(@RequestBody LikeRequest request) {
        return ResponseEntity.ok(likeService.createLike(request));
    }

    // @PatchMapping("/{id}")
    // public ResponseEntity<LikeResponse> updateLike(@PathVariable String id,
    // @RequestBody LikeRequest request) {
    // return ResponseEntity.ok(likeService.updateLike(id, request));
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable String id) {
        likeService.deleteLike(id);
        return ResponseEntity.noContent().build();
    }
}