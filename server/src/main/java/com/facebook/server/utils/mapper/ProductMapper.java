package com.facebook.server.utils.mapper;

import com.facebook.server.dto.model.ProductModel;
import com.facebook.server.entity.Product;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ProductMapper {

    private final ModelMapper mapper = new ModelMapper();

    public ProductModel mapEntityToModel(Product product) {
        return mapper.map(product, ProductModel.class);
    }

    public Product mapModelToEntity(ProductModel productModel) {
        return mapper.map(productModel, Product.class);
    }
}
