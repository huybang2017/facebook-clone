package com.facebook.server.service;

import com.facebook.server.dto.request.PostRequest;
import com.facebook.server.entity.Image;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.User;
import com.facebook.server.entity.Video;
import com.facebook.server.repository.ImageRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.repository.UserRepository;
import com.facebook.server.repository.VideoRepository;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final VideoRepository videoRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository,
            ImageRepository imageRepository, VideoRepository videoRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
    }

    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts;
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

        if (postRequest.getImageIds() != null && !postRequest.getImageIds().isEmpty()) {
            Set<Image> images = new HashSet<>(imageRepository.findAllById(postRequest.getImageIds()));
            post.setImages(images);
        }

        if (postRequest.getVideoIds() != null && !postRequest.getVideoIds().isEmpty()) {
            Set<Video> videos = new HashSet<>(videoRepository.findAllById(postRequest.getVideoIds()));
            post.setVideos(videos);
        }

        return postRepository.save(post);
    }

    public Post updatePost(String id, PostRequest postRequest) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));

        post.setCaption(postRequest.getCaption());
        post.setStatusPost(postRequest.getStatusPost());
        post.setStatusShow(postRequest.getStatusShow());

        if (postRequest.getImageIds() != null) {
            Set<Image> images = new HashSet<>(imageRepository.findAllById(postRequest.getImageIds()));
            post.setImages(images);
        }

        if (postRequest.getVideoIds() != null) {
            Set<Video> videos = new HashSet<>(videoRepository.findAllById(postRequest.getVideoIds()));
            post.setVideos(videos);
        }

        return postRepository.save(post);
    }

    public void deletePost(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));
        postRepository.delete(post);
    }
}
