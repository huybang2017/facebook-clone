package com.facebook.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facebook.server.entity.Like;
import com.facebook.server.repository.LikeRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public Optional<Like> getLikeById(String id) {
        return likeRepository.findById(id);
    }

    public Like createLike(Like like) {
        LocalDateTime now = LocalDateTime.now();
        like.setCreatedAt(now);
        like.setUpdatedAt(now);
        return likeRepository.save(like);
    }

    public Like updateLike(String id, Like likeDetails) {
        Like like = likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        if (likeDetails.getUser() != null) {
            like.setUser(likeDetails.getUser());
        }

        if (likeDetails.getPost() != null) {
            like.setPost(likeDetails.getPost());
        }

        if (likeDetails.getIcon() != null) {
            like.setIcon(likeDetails.getIcon());
        }

        like.setUpdatedAt(LocalDateTime.now());

        return likeRepository.save(like);
    }

    public void deleteLike(String id) {
        Like like = likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));
        likeRepository.delete(like);
    }
}
