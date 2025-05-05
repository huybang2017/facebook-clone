package com.facebook.server.service;

import com.facebook.server.dto.response.PhotoListResponse;
import com.facebook.server.entity.PostImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostImageService {

    void uploadPostImages(Long postId, MultipartFile[] files);

    byte[] getImages(String filename) throws IOException;

    String processPostImages(Long postId, MultipartFile image);

    PhotoListResponse fetchAllPhotos(Long userId, int pageNo, int pageSize);

    PostImage getPostImage(Long postImageId);
}
