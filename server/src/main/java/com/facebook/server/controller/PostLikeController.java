package com.facebook.server.controller;

import com.facebook.server.dto.response.LikeResponse;
import com.facebook.server.dto.response.PostLikeCountResponse;
import com.facebook.server.dto.response.UserListResponse;
import com.facebook.server.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostLikeController {

    private final PostLikeService postLikeService;

    @PutMapping("/{postId}/like")
    public void likePost(@PathVariable Long postId) {
        postLikeService.likePost(postId);
    }

    @GetMapping("/{postId}/like")
    public LikeResponse getPostLike(@PathVariable Long postId) {
        return postLikeService.getPostLike(postId);
    }

    @GetMapping("/{postId}/like/count")
    public PostLikeCountResponse getPostLikeCount(@PathVariable Long postId) {
        return postLikeService.getPostLikeCount(postId);
    }

    @GetMapping("/{postId}/like/user/list")
    public UserListResponse getPostLikeUserList(@PathVariable Long postId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return postLikeService.getPostLikeUserList(postId, pageNo, pageSize);
    }
}
