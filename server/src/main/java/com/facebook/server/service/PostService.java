package com.facebook.server.service;

import org.springframework.stereotype.Service;

import com.facebook.server.dto.request.PostRequest;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.User;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    public Post createPost(PostRequest postRequest) {
        User user = userRepository.findById(postRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        Post post = new Post();
        post.setCaption(postRequest.getCaption());
        post.setStatusPost(postRequest.getStatusPost());
        post.setStatusShow(postRequest.getStatusShow());
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    public Post updatePost(String id, PostRequest postRequest) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));

        post.setCaption(postRequest.getCaption());
        post.setStatusPost(postRequest.getStatusPost());
        post.setStatusShow(postRequest.getStatusShow());
        post.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    public void deletePost(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));
        postRepository.delete(post);
    }
}
