package com.instagram.server.controller;

import com.instagram.server.dto.request.PostRequest;
import com.instagram.server.dto.response.BaseResponse;
import com.instagram.server.dto.response.PostResponse;
import com.instagram.server.entity.Post;
import com.instagram.server.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public BaseResponse<List<PostResponse>> getAllPosts() {
        List<PostResponse> posts = postService.getAllPosts()
                .stream()
                .map(PostResponse::fromEntity)
                .collect(Collectors.toList());
        return new BaseResponse<>(HttpStatus.OK, "Lấy danh sách bài viết thành công", posts);
    }

    @GetMapping("/{id}")
    public BaseResponse<PostResponse> getPostById(@PathVariable String id) {
        Post post = postService.getPostById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));
        return new BaseResponse<>(HttpStatus.OK, "Lấy bài viết thành công", PostResponse.fromEntity(post));
    }

    @PostMapping
    public BaseResponse<PostResponse> createPost(@RequestBody PostRequest postRequest) {
        Post createdPost = postService.createPost(postRequest);
        return new BaseResponse<>(HttpStatus.CREATED, "Tạo bài viết thành công", PostResponse.fromEntity(createdPost));
    }

    @PutMapping("/{id}")
    public BaseResponse<PostResponse> updatePost(@PathVariable String id, @RequestBody PostRequest postRequest) {
        try {
            Post updatedPost = postService.updatePost(id, postRequest);
            return new BaseResponse<>(HttpStatus.OK, "Cập nhật bài viết thành công",
                    PostResponse.fromEntity(updatedPost));
        } catch (RuntimeException e) {
            throw new RuntimeException("Bài viết không tồn tại");
        }
    }

    @DeleteMapping("/{id}")
    public BaseResponse<String> deletePost(@PathVariable String id) {
        try {
            postService.deletePost(id);
            return new BaseResponse<>(HttpStatus.OK, "Xóa bài viết thành công", "Post deleted successfully!");
        } catch (RuntimeException e) {
            throw new RuntimeException("Bài viết không tồn tại");
        }
    }
}
