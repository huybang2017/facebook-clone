package com.facebook.server.service.impl;

import com.facebook.server.dto.model.ProductModel;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.ProductResponse;
import com.facebook.server.entity.Product;
import com.facebook.server.entity.User;
import com.facebook.server.repository.ProductRepository;
import com.facebook.server.service.ProductImageService;
import com.facebook.server.service.ProductService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.Pagination;
import com.facebook.server.utils.StringUtil;
import com.facebook.server.utils.mapper.ProductMapper;
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
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductImageService productImageService;
    private final Pagination pagination;
    private final UserService userService;

    @Override
    public void saveProduct(ProductModel productModel, MultipartFile[] files) {
        User user = userService.getCurrentAuthenticatedUser();

        Product product = productMapper.mapModelToEntity(productModel);
        product.setTimestamp(LocalDateTime.now());
        product.setUser(user);
        Product savedProduct = productRepository.save(product);

        if (files != null && files.length > 0) {
            productImageService.uploadImages(savedProduct.getProductId(), files);
        }
    }

    @Override
    public ProductResponse fetchAllProducts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        Page<Product> products = productRepository.findAll(pageable);
        PageResponse pageResponse = pagination.getPagination(products);
        return this.getProducts(products, productMapper, pageResponse);
    }

    @Override
    public ProductResponse fetchAllProductsByCategory(String category, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        Page<Product> products = productRepository.findProductsByCategory(category, pageable);
        PageResponse pageResponse = pagination.getPagination(products);
        return this.getProducts(products, productMapper, pageResponse);
    }

    @Override
    public ProductResponse fetchAllUserListedProducts(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, StringUtil.TIMESTAMP));
        Page<Product> products = productRepository.findAllByUser_UserId(userId, pageable);
        PageResponse pageResponse = pagination.getPagination(products);
        return this.getProducts(products, productMapper, pageResponse);
    }

    @Override
    public ProductResponse searchItem(String search, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> products = productRepository.searchItem(search, pageable);
        PageResponse pageResponse = pagination.getPagination(products);
        return this.getProducts(products, productMapper, pageResponse);
    }

    @Override
    public ProductModel findProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.map(productMapper::mapEntityToModel).orElse(null);
    }

    private ProductResponse getProducts(Page<Product> products, ProductMapper productMapper,
            PageResponse pageResponse) {
        List<ProductModel> productModels = new ArrayList<>();

        for (Product product : products) {
            ProductModel productModel = productMapper.mapEntityToModel(product);
            productModels.add(productModel);
        }
        return new ProductResponse(productModels, pageResponse);
    }
}
