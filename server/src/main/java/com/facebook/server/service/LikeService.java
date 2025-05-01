package com.facebook.server.service;

import com.facebook.server.dto.request.LikeRequest;
import com.facebook.server.dto.response.LikeResponse;
import com.facebook.server.entity.Like;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.User;
import com.facebook.server.repository.LikeRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public List<LikeResponse> getAllLikes() {
        return likeRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public LikeResponse getLikeById(String id) {
        Like like = likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));
        return convertToDto(like);
    }

    public LikeResponse createLike(LikeRequest dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        like.setIcon(dto.getIcon());

        Like savedLike = likeRepository.save(like);
        return convertToDto(savedLike);
    }

    public LikeResponse updateLike(String id, LikeRequest dto) {
        Like like = likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            like.setUser(user);
        }

        if (dto.getPostId() != null) {
            Post post = postRepository.findById(dto.getPostId())
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            like.setPost(post);
        }

        if (dto.getIcon() != null) {
            like.setIcon(dto.getIcon());
        }

        Like updated = likeRepository.save(like);
        return convertToDto(updated);
    }

    public void deleteLike(String id) {
        Like like = likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));
        likeRepository.delete(like);
    }

    private LikeResponse convertToDto(Like like) {
        LikeResponse dto = new LikeResponse();
        dto.setId(like.getId());
        dto.setUser(like.getUser());
        dto.setPost(like.getPost());
        dto.setIcon(like.getIcon());
        dto.setCreatedAt(like.getCreatedAt());
        dto.setUpdatedAt(like.getUpdatedAt());
        return dto;
    }
}
