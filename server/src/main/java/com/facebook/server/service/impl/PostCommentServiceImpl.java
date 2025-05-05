package com.facebook.server.service.impl;

import com.facebook.server.dto.model.PostCommentModel;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.PostCommentCountResponse;
import com.facebook.server.dto.response.PostCommentListResponse;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.PostComment;
import com.facebook.server.entity.User;
import com.facebook.server.repository.PostCommentRepository;
import com.facebook.server.service.CloudinaryService;
import com.facebook.server.service.PostCommentService;
import com.facebook.server.service.PostService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PostCommentServiceImpl implements PostCommentService {

    private final PostCommentRepository postCommentRepository;
    private final UserService userService;
    private final Pagination pagination;
    private final PostService postService;
    private final CloudinaryService cloudinaryService;

    @Override
    public void writePostComment(Long postId, String comment, MultipartFile file) {
        User user = userService.getCurrentAuthenticatedUser();
        Post post = postService.getPost(postId);

        PostComment postComment = new PostComment();
        postComment.setComment(comment);
        if (file != null) {
            String uploadedUrl = cloudinaryService.uploadFile(file);
            postComment.setCommentImage(uploadedUrl);
        }
        postComment.setUser(user);
        postComment.setPost(post);
        postComment.setTimestamp(LocalDateTime.now());
        postCommentRepository.save(postComment);
    }

    @Override
    public PostCommentListResponse fetchAllPostComments(Long postId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<PostComment> postComments = postCommentRepository.findAllByPost_PostId(postId, pageable);
        PageResponse pageResponse = pagination.getPagination(postComments);

        List<PostCommentModel> postCommentModelList = new ArrayList<>();

        for (PostComment postComment : postComments) {
            PostCommentModel postCommentModel = this.getPostComment(postComment);
            postCommentModelList.add(postCommentModel);
        }

        return new PostCommentListResponse(postCommentModelList, pageResponse);
    }

    @Override
    public PostCommentCountResponse getCommentCount(Long postId) {

        Long commentCount = postCommentRepository.countPostComment(postId);
        PostCommentCountResponse countResponse = new PostCommentCountResponse();
        countResponse.setPostCommentCount(commentCount);

        return countResponse;
    }

    @Override
    public PostCommentModel getLastComment(Long postId) {
        PageRequest pageRequest = PageRequest.of(0, 1);
        List<PostComment> postComments = postCommentRepository.findLastComment(postId, pageRequest);
        return postComments.stream()
                .findFirst()
                .map(this::getPostComment)
                .orElse(null);
    }

    private PostCommentModel getPostComment(PostComment postComment) {
        PostCommentModel postCommentModel = new PostCommentModel();
        postCommentModel.setPostCommentId(postComment.getPostCommentId());
        postCommentModel.setComment(postComment.getComment());
        postCommentModel.setCommentImage(postComment.getCommentImage());
        postCommentModel.setFirstName(postComment.getUser().getFirstName());
        postCommentModel.setLastName(postComment.getUser().getLastName());
        postCommentModel.setProfilePicture(postComment.getUser().getProfilePicture());
        postCommentModel.setTimestamp(postComment.getTimestamp());
        postCommentModel.setUserId(postComment.getUser().getUserId());

        return postCommentModel;
    }

}
