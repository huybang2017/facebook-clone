package com.facebook.server.service;

import org.springframework.web.multipart.MultipartFile;

public interface ProductImageService {
    void uploadImages(Long productId, MultipartFile[] files);
}
