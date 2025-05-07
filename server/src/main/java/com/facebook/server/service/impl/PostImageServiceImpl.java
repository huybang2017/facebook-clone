package com.facebook.server.service.impl;

import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.PhotoListResponse;
import com.facebook.server.dto.response.PostImageResponse;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.PostImage;
import com.facebook.server.repository.PostImageRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.service.CloudinaryService;
import com.facebook.server.service.PostImageService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostImageServiceImpl implements PostImageService {

  private final PostRepository postRepository;
  private final PostImageRepository postImageRepository;
  private final Pagination pagination;
  private final CloudinaryService cloudinaryService;

  @Override
  public void uploadPostImages(Long postId, MultipartFile[] files) {
    Optional<Post> post = postRepository.findById(postId);

    if (post.isPresent()) {
      for (MultipartFile file : files) {
        String uploadedUrl = cloudinaryService.uploadFile(file);

        PostImage postImage = new PostImage();
        postImage.setPost(post.get());
        postImage.setPostImageUrl(uploadedUrl);
        postImage.setTimestamp(LocalDateTime.now());
        postImageRepository.save(postImage);
      }
    }
  }

  // @Override
  // public byte[] getImages(String filename) throws IOException {
  // return Files.readAllBytes(Paths.get(filename));
  // }

  @Override
  public PhotoListResponse fetchAllPhotos(Long userId, int pageNo, int pageSize) {
    Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
    Page<PostImage> postImages = postImageRepository.findAllPostImagesByUserId(userId, pageable);
    PageResponse pageResponse = pagination.getPagination(postImages);

    List<PostImageResponse> postImageResponses = new ArrayList<>();

    for (PostImage postImage : postImages) {
      PostImageResponse postImageResponse = new PostImageResponse();
      postImageResponse.setPostImageId(postImage.getPostImageId());
      postImageResponse.setPostImageUrl(postImage.getPostImageUrl());
      postImageResponse.setTimestamp(postImage.getTimestamp());
      postImageResponse.setPostId(postImage.getPost().getPostId());

      postImageResponses.add(postImageResponse);
    }

    return new PhotoListResponse(postImageResponses, pageResponse);
  }

  @Override
  public PostImage getPostImage(Long postImageId) {
    return postImageRepository.findById(postImageId)
        .orElseThrow(() -> new NoSuchElementException("Post image not found with id: " + postImageId));
  }
}
