package com.facebook.server.service;

import com.facebook.server.dto.model.PostCommentModel;
import com.facebook.server.dto.response.PostCommentCountResponse;
import com.facebook.server.dto.response.PostCommentListResponse;
import org.springframework.web.multipart.MultipartFile;

public interface PostCommentService {

    void writePostComment(Long postId, String comment, MultipartFile file);

    PostCommentListResponse fetchAllPostComments(Long postId, int pageNo, int pageSize);

    PostCommentCountResponse getCommentCount(Long postId);

    PostCommentModel getLastComment(Long postId);
}
