package com.facebook.server.controller;

import com.facebook.server.dto.model.ProductModel;
import com.facebook.server.dto.response.ProductResponse;
import com.facebook.server.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = { "/save" }, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @ResponseStatus(HttpStatus.CREATED)
    public void saveProduct(@RequestPart("product") @Valid ProductModel productModel,
            @RequestPart("file") MultipartFile[] files) {
        productService.saveProduct(productModel, files);
    }

    @GetMapping
    public ProductResponse fetchAllProducts(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return productService.fetchAllProducts(pageNo, pageSize);
    }

    @GetMapping("/{category}")
    public ProductResponse fetchAllProductsByCategory(@PathVariable("category") String category,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return productService.fetchAllProductsByCategory(category, pageNo, pageSize);
    }

    @GetMapping("/user/{userId}")
    public ProductResponse fetchAllUserListedProducts(@PathVariable("userId") Long userId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return productService.fetchAllUserListedProducts(userId, pageNo, pageSize);
    }

    @GetMapping("/search")
    public ProductResponse searchItem(@RequestParam(value = "keyword") String search,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return productService.searchItem(search, pageNo, pageSize);
    }

    @GetMapping("/find/{productId}")
    public ProductModel findProductById(@PathVariable("productId") Long productId) {
        return productService.findProductById(productId);
    }
}
