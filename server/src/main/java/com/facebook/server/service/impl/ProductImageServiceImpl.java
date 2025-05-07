package com.facebook.server.service.impl;

import com.facebook.server.entity.Product;
import com.facebook.server.entity.ProductImage;
import com.facebook.server.repository.ProductImageRepository;
import com.facebook.server.repository.ProductRepository;
import com.facebook.server.service.CloudinaryService;
import com.facebook.server.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    // private final PostImageService postImageService;
    private final CloudinaryService cloudinaryService;

    @Override
    public void uploadImages(Long productId, MultipartFile[] files) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isPresent()) {
            for (MultipartFile file : files) {
                String uploadedUrl = cloudinaryService.uploadFile(file);
                ProductImage productImage = new ProductImage();
                productImage.setProductImage(uploadedUrl);
                productImage.setProduct(product.get());
                productImageRepository.save(productImage);
            }
        }
    }
}
