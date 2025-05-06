package com.facebook.server.service;

import com.facebook.server.dto.response.LikeResponse;
import com.facebook.server.dto.response.PostLikeCountResponse;
import com.facebook.server.dto.response.UserListResponse;

public interface PostLikeService {

    void likePost(Long postId);

    LikeResponse getPostLike(Long postId);

    PostLikeCountResponse getPostLikeCount(Long postId);

    UserListResponse getPostLikeUserList(Long postId, int pageNo, int pageSize);
}
