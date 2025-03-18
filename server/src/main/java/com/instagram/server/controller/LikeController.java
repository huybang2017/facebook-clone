package com.instagram.server.controller;

import com.instagram.server.entity.Like;
import com.instagram.server.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping
    public List<Like> getAllLikes() {
        return likeService.getAllLikes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Like> getLikeById(@PathVariable String id) {
        Optional<Like> like = likeService.getLikeById(id);
        return like.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Like createLike(@RequestBody Like like) {
        return likeService.createLike(like);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Like> updateLike(@PathVariable String id, @RequestBody Like likeDetails) {
        try {
            Like updatedLike = likeService.updateLike(id, likeDetails);
            return ResponseEntity.ok(updatedLike);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable String id) {
        try {
            likeService.deleteLike(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
