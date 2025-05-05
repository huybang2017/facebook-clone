package com.facebook.server.service.impl;

import com.facebook.server.dto.model.PostModel;
import com.facebook.server.dto.request.SharePostRequest;
import com.facebook.server.dto.request.ToxicPostRequest;
import com.facebook.server.dto.response.*;
import com.facebook.server.entity.Friendship;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.PostImage;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.FriendshipStatus;
import com.facebook.server.repository.PostImageRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.service.AiModerationPostService;
import com.facebook.server.service.PostImageService;
import com.facebook.server.service.PostService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.StringUtil;
import com.facebook.server.utils.mapper.PostMapper;
import com.facebook.server.utils.mapper.SharedPostMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final PostImageService postImageService;
  private final PostMapper postMapper;
  private final SharedPostMapper sharedPostMapper;
  private final PostImageRepository postImageRepository;
  private final Pagination pagination;
  private final UserService userService;
  private final AiModerationPostService aiModerationPostService;

  @Transactional
  @Override
  public void createPost(Long userId, String content, MultipartFile[] files) {
    User user = userService.getCurrentAuthenticatedUser();
    User guestPoster = userService.getUserByUserId(userId);
    Long currentUserId = user.getUserId();

    Post post = new Post();
    post.setContent(content);
    post.setTimestamp(LocalDateTime.now());

    if (currentUserId.equals(userId)) {
      post.setUser(user);
    } else {
      post.setUser(guestPoster);
      post.setGuestPoster(user);
    }

    Post savedPost = postRepository.save(post);

    if (files != null && files.length > 0) {
      postImageService.uploadPostImages(savedPost.getPostId(), files);
    }
  }

  @Override
  public PostListResponse fetchAllUserPosts(Long userId, int pageNo, int pageSize) {
    Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
    Page<Post> posts = postRepository.findAllByUser_UserId(userId, pageable);
    PageResponse pageResponse = pagination.getPagination(posts);

    List<PostModel> postModelList = new ArrayList<>();

    for (Post post : posts) {
      PostModel postModel = this.getPost(post, postMapper);
      if (post.getSharedPost() != null) {
        Post sharedPost = post.getSharedPost();
        postModel.setSharedPost(this.getSharedPost(sharedPost));
      }
      postModelList.add(postModel);
    }
    return new PostListResponse(postModelList, pageResponse);
  }

  @Override
  public PostListResponseAdmin fetchAllPostHaveContent(int pageNo, int pageSize) {
    Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));

    Page<Post> posts = postRepository.findAllByContentIsNotNullAndContentNot("", pageable);
    PageResponse pageResponse = pagination.getPagination(posts);

    List<PostWithToxicResponse> postWithToxicResponseList = new ArrayList<>();

    for (Post post : posts) {
      PostModel postModel = this.getPost(post, postMapper);

      ToxicPostRequest toxicPostRequest = new ToxicPostRequest(post.getPostId());
      ToxicPostResponse toxicPostResponse = aiModerationPostService.moderate(toxicPostRequest);

      if (post.getSharedPost() != null) {
        Post sharedPost = post.getSharedPost();
        postModel.setSharedPost(this.getSharedPost(sharedPost));
      }

      PostWithToxicResponse postWithToxicResponse = new PostWithToxicResponse(postModel, toxicPostResponse);
      postWithToxicResponseList.add(postWithToxicResponse);
    }

    return new PostListResponseAdmin(postWithToxicResponseList, pageResponse);
  }

  @Override
  public PostListResponse fetchAllPosts(int pageNo, int pageSize) {
    User currentUser = userService.getCurrentAuthenticatedUser();
    Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));

    Long userId = currentUser.getUserId();
    List<Long> friendIds = new ArrayList<>();

    for (Friendship friendship : currentUser.getFriends()) {
      if (friendship.getStatus().equals(FriendshipStatus.FRIENDS)) {
        Long friendId = friendship.getFriends().getUserId();
        friendIds.add(friendId);
      }
    }

    Page<Post> posts = postRepository.findPostsByUserIdAndFriendId(userId, friendIds, pageable);
    PageResponse pageResponse = pagination.getPagination(posts);
    List<PostModel> postModelList = new ArrayList<>();

    for (Post post : posts) {
      PostModel postModel = this.getPost(post, postMapper);
      if (post.getSharedPost() != null) {
        Post sharedPost = post.getSharedPost();
        postModel.setSharedPost(this.getSharedPost(sharedPost));
      }
      postModelList.add(postModel);
    }

    return new PostListResponse(postModelList, pageResponse);
  }

  @Override
  public void sharePost(Long postId, SharePostRequest request) {
    User user = userService.getCurrentAuthenticatedUser();
    Optional<Post> sharedPost = postRepository.findById(postId);

    if (sharedPost.isPresent()) {
      Post post = sharedPost.get();
      Post newPost = new Post();
      newPost.setContent(request.getContent());
      newPost.setTimestamp(LocalDateTime.now());
      newPost.setUser(user);
      if (post.getSharedPost() != null && post.getSharedImage() == null) {
        newPost.setSharedPost(post.getSharedPost());
      } else if (post.getSharedImage() != null) {
        newPost.setSharedPost(post.getSharedPost());
        newPost.setSharedImage(post.getSharedImage());
      } else {
        newPost.setSharedPost(post);
      }
      postRepository.save(newPost);
    }
  }

  @Override
  public void sharePostImage(Long postImageId, Long postId, SharePostRequest request) {
    User user = userService.getCurrentAuthenticatedUser();
    Optional<PostImage> postImage = postImageRepository.findById(postImageId);
    Optional<Post> sharedPost = postRepository.findById(postId);

    if (postImage.isPresent() && sharedPost.isPresent()) {
      Post post = sharedPost.get();
      Post newPost = new Post();
      newPost.setContent(request.getContent());
      newPost.setTimestamp(LocalDateTime.now());
      newPost.setUser(user);

      if (post.getSharedPost() != null && post.getSharedImage() != null) {
        newPost.setSharedPost(post.getSharedPost());
        newPost.setSharedImage(post.getSharedImage());
      } else if (post.getSharedImage() == null && post.getSharedPost() != null) {
        newPost.setSharedPost(post.getSharedPost());
        newPost.setSharedImage(postImage.get());
      } else {
        newPost.setSharedImage(postImage.get());
        newPost.setSharedPost(post);
      }

      postRepository.save(newPost);
    }
  }

  @Override
  public SharedPostCountResponse getSharedPostImageCount(Long postImageId) {
    Long count = postRepository.countSharedPostImage(postImageId);

    SharedPostCountResponse sharedPostCountResponse = new SharedPostCountResponse();
    sharedPostCountResponse.setSharedPostCount(count);
    return sharedPostCountResponse;
  }

  @Override
  public SharedPostCountResponse getSharedPostCount(Long postId) {

    Long count = postRepository.countSharedPost(postId);

    SharedPostCountResponse sharedPostCountResponse = new SharedPostCountResponse();
    sharedPostCountResponse.setSharedPostCount(count);
    return sharedPostCountResponse;
  }

  @Override
  public void deletePost(Long postId) {
    postRepository.deleteById(postId);
  }

  @Override
  public PostResponse findPostCreatorById(Long postId) {
    Post post = this.getPost(postId);

    PostResponse postResponse = new PostResponse();

    postResponse.setPostId(post.getPostId());
    postResponse.setPostTimestamp(post.getTimestamp());
    postResponse.setContent(post.getContent());

    User poster = post.getGuestPoster() != null ? post.getGuestPoster() : post.getUser();
    postResponse.setUserId(poster.getUserId());
    postResponse.setFirstName(poster.getFirstName());
    postResponse.setLastName(poster.getLastName());
    postResponse.setProfilePicture(poster.getProfilePicture());

    return postResponse;
  }

  @Override
  public PostModel getPostById(Long postId) {

    Post post = this.getPost(postId);

    PostModel postModel = this.getPost(post, postMapper);
    if (post.getSharedPost() != null) {
      Post sharedPost = post.getSharedPost();
      postModel.setSharedPost(this.getSharedPost(sharedPost));
    }

    return postModel;
  }

  @Override
  public Post getPost(Long postId) {
    return postRepository.findById(postId)
        .orElseThrow(() -> new NoSuchElementException("Post not found!"));
  }

  private PostModel getPost(Post post, PostMapper postMapper) {
    PostModel postModel = postMapper.mapEntityToModel(post);
    postModel.setUserId(post.getUser().getUserId());
    postModel.setFirstName(post.getUser().getFirstName());
    postModel.setLastName(post.getUser().getLastName());
    postModel.setProfilePicture(post.getUser().getProfilePicture());
    return postModel;
  }

  private SharedPostResponse getSharedPost(Post sharedPost) {

    SharedPostResponse sharedPostResponse = sharedPostMapper.mapEntityToModel(sharedPost);
    sharedPostResponse.setUserId(sharedPost.getUser().getUserId());
    sharedPostResponse.setFirstName(sharedPost.getUser().getFirstName());
    sharedPostResponse.setLastName(sharedPost.getUser().getLastName());
    sharedPostResponse.setProfilePicture(sharedPost.getUser().getProfilePicture());

    return sharedPostResponse;
  }
}
