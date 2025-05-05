package com.facebook.server.service.impl;

import com.facebook.server.dto.model.UserDataModel;
import com.facebook.server.dto.response.LikeResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.PostLikeCountResponse;
import com.facebook.server.dto.response.UserListResponse;
import com.facebook.server.entity.PostImage;
import com.facebook.server.entity.PostImageLikes;
import com.facebook.server.entity.User;
import com.facebook.server.repository.PostImageLikesRepository;
import com.facebook.server.service.PostImageLikeService;
import com.facebook.server.service.PostImageService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostImageLikeServiceImpl implements PostImageLikeService {

    private final PostImageLikesRepository postImageLikesRepository;
    private final Pagination pagination;
    private final UserService userService;
    private final PostImageService postImageService;

    @Transactional
    @Override
    public void likePostImage(Long postImageId) {
        User user = userService.getCurrentAuthenticatedUser();
        PostImage postImage = postImageService.getPostImage(postImageId);
        Optional<PostImageLikes> optionalPostImageLikes = postImageLikesRepository
                .findByPostImage_PostImageIdAndUser_UserId(postImageId, user.getUserId());

        if (optionalPostImageLikes.isPresent()) {
            postImageLikesRepository.deleteByPostImage_PostImageIdAndUser_UserId(postImageId, user.getUserId());
        } else {
            PostImageLikes postImageLikes = new PostImageLikes();
            postImageLikes.setTimestamp(LocalDateTime.now());
            postImageLikes.setPostImage(postImage);
            postImageLikes.setUser(user);
            postImageLikesRepository.save(postImageLikes);
        }
    }

    @Override
    public LikeResponse getPostImageLike(Long postImageId) {
        User user = userService.getCurrentAuthenticatedUser();
        Optional<PostImageLikes> postLike = postImageLikesRepository
                .findByPostImage_PostImageIdAndUser_UserId(postImageId, user.getUserId());

        LikeResponse likeResponse = new LikeResponse();

        likeResponse.setLiked(postLike.isPresent());

        return likeResponse;
    }

    @Override
    public PostLikeCountResponse getPostImageLikeCount(Long postImageId) {

        Long postImageLikes = postImageLikesRepository.countPostImageLike(postImageId);
        PostLikeCountResponse postLikeCountResponse = new PostLikeCountResponse();
        postLikeCountResponse.setPostLikeCount(postImageLikes);

        return postLikeCountResponse;
    }

    @Override
    public UserListResponse getPostImageLikeUserList(Long postImageId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<PostImageLikes> postImageLikes = postImageLikesRepository.findAllByPostImage_PostImageId(postImageId,
                pageable);
        PageResponse pageResponse = pagination.getPagination(postImageLikes);

        List<UserDataModel> userDataModels = new ArrayList<>();

        for (PostImageLikes postImageLike : postImageLikes) {
            UserDataModel userDataModel = new UserDataModel();
            userDataModel.setUniqueId(postImageLike.getPostImageLikeId());
            userDataModel.setUserId(postImageLike.getUser().getUserId());
            userDataModel.setFirstName(postImageLike.getUser().getFirstName());
            userDataModel.setLastName(postImageLike.getUser().getLastName());
            userDataModel.setProfilePicture(postImageLike.getUser().getProfilePicture());
            userDataModels.add(userDataModel);
        }
        return new UserListResponse(userDataModels, pageResponse);
    }

}
