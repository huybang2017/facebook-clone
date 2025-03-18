package com.instagram.server.service;

import com.instagram.server.entity.Like;
import com.instagram.server.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        like.setCreatedAt(LocalDateTime.now());
        return likeRepository.save(like);
    }

    public Like updateLike(String id, Like likeDetails) {
        Like like = likeRepository.findById(id).orElseThrow(() -> new RuntimeException("Like not found"));
        like.setUser(likeDetails.getUser());
        like.setPost(likeDetails.getPost());
        return likeRepository.save(like);
    }

    public void deleteLike(String id) {
        Like like = likeRepository.findById(id).orElseThrow(() -> new RuntimeException("Like not found"));
        likeRepository.delete(like);
    }
}
