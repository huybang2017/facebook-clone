package com.facebook.server.service;

import com.facebook.server.dto.request.CommentRequest;
import com.facebook.server.dto.response.CommentResponse;
import com.facebook.server.entity.Comment;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.User;
import com.facebook.server.repository.CommentRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public List<CommentResponse> getAllComments() {
        return commentRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CommentResponse getCommentById(String id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return toDto(comment);
    }

    public CommentResponse createComment(CommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setDescription(request.getDescription());
        comment.setUser(user);
        comment.setPost(post);

        Comment saved = commentRepository.save(comment);
        return toDto(saved);
    }

    public void deleteComment(String id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }

    private CommentResponse toDto(Comment comment) {
        CommentResponse dto = new CommentResponse();
        dto.setId(comment.getId());
        dto.setDescription(comment.getDescription());
        dto.setUser(comment.getUser());
        dto.setPost(comment.getPost());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
