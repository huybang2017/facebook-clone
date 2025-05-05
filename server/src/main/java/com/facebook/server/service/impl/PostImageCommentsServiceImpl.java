package com.facebook.server.service.impl;

import com.facebook.server.dto.model.PostCommentModel;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.PostCommentCountResponse;
import com.facebook.server.dto.response.PostCommentListResponse;
import com.facebook.server.entity.PostImage;
import com.facebook.server.entity.PostImageComments;
import com.facebook.server.entity.User;
import com.facebook.server.repository.PostImageCommentsRepository;
import com.facebook.server.service.PostImageCommentsService;
import com.facebook.server.service.PostImageService;
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
public class PostImageCommentsServiceImpl implements PostImageCommentsService {

    private final PostImageCommentsRepository postImageCommentsRepository;
    private final UserService userService;
    private final Pagination pagination;
    private final PostImageService postImageService;

    @Override
    public void writePostImageComment(Long postImageId, String comment, MultipartFile file) {
        User user = userService.getCurrentAuthenticatedUser();
        PostImage postImage = postImageService.getPostImage(postImageId);

        PostImageComments postImageComments = new PostImageComments();
        postImageComments.setComment(comment);
        if (file != null) {
            postImageComments.setCommentImage(userService.processImage(file));
        }
        postImageComments.setUser(user);
        postImageComments.setPostImage(postImage);
        postImageComments.setTimestamp(LocalDateTime.now());
        postImageCommentsRepository.save(postImageComments);
    }

    @Override
    public PostCommentListResponse fetchAllPostImageComments(Long postImageId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<PostImageComments> postImageComments = postImageCommentsRepository
                .findAllByPostImage_PostImageId(postImageId, pageable);
        PageResponse pageResponse = pagination.getPagination(postImageComments);

        List<PostCommentModel> postCommentModelList = new ArrayList<>();

        for (PostImageComments postImageComment : postImageComments) {
            PostCommentModel postCommentModel = new PostCommentModel();
            postCommentModel.setPostCommentId(postImageComment.getPostImageCommentId());
            postCommentModel.setComment(postImageComment.getComment());
            postCommentModel.setCommentImage(postImageComment.getCommentImage());
            postCommentModel.setFirstName(postImageComment.getUser().getFirstName());
            postCommentModel.setLastName(postImageComment.getUser().getLastName());
            postCommentModel.setProfilePicture(postImageComment.getUser().getProfilePicture());
            postCommentModel.setTimestamp(postImageComment.getTimestamp());
            postCommentModel.setUserId(postImageComment.getUser().getUserId());
            postCommentModelList.add(postCommentModel);
        }

        return new PostCommentListResponse(postCommentModelList, pageResponse);
    }

    @Override
    public PostCommentCountResponse getPostImageCommentCount(Long postImageId) {

        Long commentCount = postImageCommentsRepository.countPostImageComments(postImageId);
        PostCommentCountResponse countResponse = new PostCommentCountResponse();
        countResponse.setPostCommentCount(commentCount);

        return countResponse;

    }
}
