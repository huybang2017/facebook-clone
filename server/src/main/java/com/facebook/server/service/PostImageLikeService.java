package com.facebook.server.service;

import com.facebook.server.dto.response.LikeResponse;
import com.facebook.server.dto.response.PostLikeCountResponse;
import com.facebook.server.dto.response.UserListResponse;

public interface PostImageLikeService {

    void likePostImage(Long postImageId);

    LikeResponse getPostImageLike(Long postImageId);

    PostLikeCountResponse getPostImageLikeCount(Long postImageId);

    UserListResponse getPostImageLikeUserList(Long postImageId, int pageNo, int pageSize);

}
