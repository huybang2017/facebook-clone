package com.facebook.server.service;

import com.facebook.server.dto.response.PostCommentCountResponse;
import com.facebook.server.dto.response.PostCommentListResponse;
import org.springframework.web.multipart.MultipartFile;

public interface PostImageCommentsService {

    void writePostImageComment(Long postImageId, String comment, MultipartFile file);

    PostCommentListResponse fetchAllPostImageComments(Long postImageId, int pageNo, int pageSize);

    PostCommentCountResponse getPostImageCommentCount(Long postImageId);
}
